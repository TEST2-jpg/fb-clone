import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState, useEffect } from "react";
import VisitUser from "./components/VisitUser";
import Friends from "./components/Friends";

const RouteSwitch = () => {
  const [token, setToken] = useState("");
  const [userId, setuserId] = useState("");
  const [userData, setUserData] = useState({});

  const getUserInfo = async () => {
    const response = await fetch("http://localhost:8080/users/" + userId, {
      headers: { Authorization: "Bearer " + token },
    });
    const user = await response.json();
    setUserData(user);
  };

  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home userId={userId} token={token} userData={userData} />}
        />
        <Route
          path="/reg"
          exact
          element={<Register setToken={setToken} setuserId={setuserId} />}
        />
        <Route
          path="/login"
          exact
          element={
            <Login token={token} setToken={setToken} setuserId={setuserId} />
          }
        />
        <Route
          path="/:userId"
          element={
            <VisitUser
              userId={userId}
              token={token}
              userData={userData}
              setUserData={setUserData}
            />
          }
        />
        <Route
          path="/friends"
          exact
          element={<Friends token={token} userId={userId} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
