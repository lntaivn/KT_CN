<<<<<<< HEAD
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { UserList, UserUpdate } from './components/UserList/UserList';
import News from './components/News/News';
import NewsDetail from './components/NewsDetail/NewsDetail';
import Editor from './components/Editor/Editor';
=======

import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
>>>>>>> 2aa395381c88720e2b3e6668995a02fb0986d593

import axios from 'axios';

function App() {

  const handleGetUser = () => {
    axios.get(`http://127.0.0.1:8000/user`, {
      withCredentials: true
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    handleGetUser();
  }, [])

  return (
    <div className='App'>
            
            <Routes>
              <Route path="/" element={<News/>} />
              <Route path="/news/detail/:glug" element={<NewsDetail/>} />
              <Route path="/Edit" element={<Editor/>} />
            </Routes>
    </div>
  );
}

export default App;
