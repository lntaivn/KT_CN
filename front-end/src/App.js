
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Client from './layouts/Client';
import Admin from './layouts/Admin';
import { useEffect, useState } from 'react';

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
        <Route path="" element={<Client/>}/>
      </Routes>
      {showScrollButton && (
        <div className="scroll-to-top-button" onClick={scrollToTop}>
          <i className="fa-solid fa-chevron-up"></i>
        </div>
      )}
    </div>
  );
>>>>>>> 953b3e70e3e3c9fa03c8b30615825db1f9ee3db4
}

export default App;
