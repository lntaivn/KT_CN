import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { UserList, UserUpdate } from './components/UserList/UserList';
import News from './components/News/News';
import NewsDetail from './components/NewsDetail/NewsDetail';
import Editor from './components/Editor/Editor';

function App() {
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
