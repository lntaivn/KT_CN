import "./App.css";
import "react-dom";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <div className="App">
            <Header></Header>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer></Footer>
        </div>
    );
}

export default App;
