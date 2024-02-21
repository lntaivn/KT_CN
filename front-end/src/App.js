
import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
