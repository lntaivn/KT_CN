<<<<<<< HEAD
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { UserList, UserUpdate } from './components/UserList/UserList';
import News from './components/News/News';
import NewsDetail from './components/NewsDetail/NewsDetail';
import Editor from './components/Editor/Editor';
=======

import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
>>>>>>> 2aa395381c88720e2b3e6668995a02fb0986d593

import axios from 'axios';
=======
import { Route, Routes } from 'react-router-dom';
import Client from './layouts/Client';
import Admin from './layouts/Admin';
>>>>>>> dc3f65b550b40803d71c2685f2bddae5ee94810e

function App() {
  return (
<<<<<<< HEAD
    <div className='App'>
            
            <Routes>
              <Route path="/" element={<News/>} />
              <Route path="/news/detail/:glug" element={<NewsDetail/>} />
              <Route path="/Edit" element={<Editor/>} />
            </Routes>
=======
    <div className="App">
      <Routes>
        <Route path="/admin/*" element={<Admin/>}/>
        <Route path="" element={<Client/>}/>
      </Routes>
>>>>>>> dc3f65b550b40803d71c2685f2bddae5ee94810e
    </div>
  );
}

export default App;
