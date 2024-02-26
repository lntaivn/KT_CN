
import Header from '../components/pages/Client/Header/Header';
import Home from '../components/pages/Client/Home/Home';
import Menu from '../components/pages/Client/Menu/Menu';
import './Layout.css';
import { Route, Routes } from 'react-router-dom';
import { Image } from "@nextui-org/react";
import About from '../components/pages/Client/About/About';

function Client() {
    return (
        <div className="Client">
            <Header />
            <Image
                className='w-[100vw] hidden lg:flex'
                radius="none"
                src="https://ktcn.tvu.edu.vn/ht96_image/bg.png"
            />
            <Menu />
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/about" element={<About/>} />
           </Routes>
            <footer>Footer</footer>
        </div>
    );
}

export default Client;
