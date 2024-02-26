
// 
// import logo from "./logo.svg";
// import "./App.css";

// import axios from "axios";
// import Header from "./components/Header/Header";
// import Home from "./components/Home/Home";
// import Cardd from "./components/Card/Cardd";
// import { Routes, Route } from "react-router-dom";
// import DetailNews from "./components/News/DetailNews";
// // import { Card } from "antd";

// function App() {
//     // const handleGetUser = () => {
//     //     axios
//     //         .get(`http://127.0.0.1:8000/users`, {
//     //             withCredentials: true,
//     //         })
//     //         .then((response) => {
//     //             console.log(response.data);
//     //         })
//     //         .catch((error) => {
//     //             console.log(error);
//     //         });
//     // };

//     // useEffect(() => {
//     //     handleGetUser();
//     // }, []);

//     return (
//         <div className="App">
//             <Header></Header>
//             <Routes>
//                 
//                 <Route path="/detailnew/:id" element={<DetailNews />} />
//             </Routes>
//         </div>
//     );

import { useState, useEffect } from 'react';

import { Route, Routes, useLocation } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { UserList, UserUpdate } from './components/UserList/UserList';
import News from './components/News/News';
import NewsDetail from './components/NewsDetail/NewsDetail';
import Editor from './components/Editor/Editor';
import Admin from './layouts/Admin';
import Client from './layouts/Client';
import Home from './components/Home/Home';

function App() {

  const location = useLocation();
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setShowScrollButton(scrollY > 250);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/admin/*" element={<Admin/>}/>
        <Route path="/edit" element={<Editor />}/>
        <Route path="" element={<Client />}/>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<Client />} />

      </Routes>
      {showScrollButton && (
        <div className="scroll-to-top-button" onClick={scrollToTop}>
          <i className="fa-solid fa-chevron-up"></i>
        </div>
      )}
    </div>
  );

}

export default App;
