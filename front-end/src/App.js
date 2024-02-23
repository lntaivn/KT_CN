import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import axios from "axios";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Cardd from "./components/Card/Cardd";
import { Routes, Route } from "react-router-dom";
import DetailNews from "./components/News/DetailNews";
// import { Card } from "antd";

function App() {
    // const handleGetUser = () => {
    //     axios
    //         .get(`http://127.0.0.1:8000/users`, {
    //             withCredentials: true,
    //         })
    //         .then((response) => {
    //             console.log(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    // useEffect(() => {
    //     handleGetUser();
    // }, []);

    return (
        <div className="App">
            <Header></Header>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/detailnew/:id" element={<DetailNews />} />
            </Routes>
        </div>
    );
}

export default App;
