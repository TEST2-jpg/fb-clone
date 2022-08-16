import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login";
import Register from "./components/Register"
import { useState, useEffect } from "react";
import Nav from "./components/Nav"

const RouteSwitch = () => {
    const [token, setToken] = useState('')
    const [userId, setuserId] = useState('')
    const [ps, sp] = useState('')
    const [userData, setUserData] = useState({})
    
    const getUserInfo = async () => {
        const response = await fetch('http://localhost:8080/users/' + userId, {
            headers: { Authorization: 'Bearer ' + token }
        })
        const user = await response.json()
        setUserData(user)
    }

    useEffect(() => {
        console.log('asdaiosdaoijs')
        if(token) {
            getUserInfo()
        }
    }, [token])

    return (
        <BrowserRouter>
                <Nav/>
            <Routes>
                <Route path="/" element={<Home userId={userId} token={token} ps={ps} userData={userData} />} />
                <Route path="/reg" exact element={<Register />} />
                <Route path="/login" exact element={<Login token={token} setToken={setToken} setuserId={setuserId} ps={ps} sp={sp}  />} />
                {/* <Route path="/shop/:name" element={<Product shopList={shopList} setshopList={setshopList}/>} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;