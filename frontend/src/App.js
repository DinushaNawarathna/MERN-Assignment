import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup/index";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";

function App() {
  const user = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <Routes>
        {user && <Route path="/" exact element={<Main />} />}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
