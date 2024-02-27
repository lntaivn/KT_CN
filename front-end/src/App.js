import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { UserList, UserUpdate } from './components/UserList/UserList';
import News from './components/News/News';
import NewsDetail from './components/NewsDetail/NewsDetail';
import Editor from './components/Editor/Editor';
import Admin from './layouts/Admin';
import Client from './layouts/Client';

import "./App.css"

function App() {

  const location = useLocation();
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/edit" element={<Editor />} />
        <Route path="" element={<Client />} />
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
