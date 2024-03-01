
import logo from "../assets/KTCN-in.png"
import CreateNews from '../components/pages/Admin/CreateNews/CreateNews';
import UpdateNews from '../components/pages/Admin/UpdateNews/UpdateNews';
import './Layout.css';
import { Link, Route, Routes } from 'react-router-dom';
import Navbar from "../components/pages/Admin/Navbar/Navbar";
import Post from "../components/pages/Admin/Post/Post";

function Admin() {
  return (
    <div className="Admin flex h-[100vh]">
      <Navbar />
      <div className='Admin-Content flex-1 h-full overflow-auto p-5 px-7'>
        <Routes>
          <Route path="/post" element={<Post />} />
          <Route path="/create-news-by-ckeditor5" element={<CreateNews />} />
          <Route path="/update/news/:id" element={<UpdateNews />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
