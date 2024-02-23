
import Header from '../components/pages/Client/Header/Header';
import Home from '../components/pages/Client/Home/Home';
import './Layout.css';
import { Route, Routes } from 'react-router-dom';

function Client() {
    return (
        <div className="Client">
            <Header/>
            <Routes>
                <Route path="" element={<Home />} />
            </Routes>
            <footer>Footer</footer>
        </div>
    );
}

export default Client;
