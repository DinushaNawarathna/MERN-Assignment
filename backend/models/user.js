const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	latitude: { type: Number, required: true },
	longitude: { type: Number, required: true }
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		latitude: Joi.number().required().label("Latitude"),
		longitude: Joi.number().required().label("Longitude")
	});
	return schema.validate(data);
};

module.exports = { User, validate };