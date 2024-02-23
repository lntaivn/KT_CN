
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Client from './layouts/Client';
import Admin from './layouts/Admin';

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
