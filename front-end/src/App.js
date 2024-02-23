import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { UserList, UserUpdate } from './components/UserList/UserList';
import News from './components/News/News';
import NewsDetail from './components/NewsDetail/NewsDetail';
import Editor from './components/Editor/Editor';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin/*" element={<Admin/>}/>
        <Route path="" element={<Client/>}/>
      </Routes>
    </div>
  );
}

export default App;
