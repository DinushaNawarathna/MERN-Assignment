from flask import Flask, jsonify
from pymongo import MongoClient
from sklearn.cluster import KMeans
import numpy as np

app = Flask(__name__)
client = MongoClient("mongodb://localhost:27017/")
db = client["location_db"]
collection = db["locations"]

@app.route("/api/clustered-locations", methods=["GET"])
def get_clustered_locations():
    data = list(collection.find({}, {"_id": 0}))
    coordinates = np.array([[item["latitude"], item["longitude"]] for item in data])
    
    kmeans = KMeans(n_clusters=3, random_state=0).fit(coordinates)
    clustered_data = [{"latitude": point[0], "longitude": point[1], "cluster": int(label)}
                      for point, label in zip(coordinates, kmeans.labels_)]
    return jsonify(clustered_data)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
