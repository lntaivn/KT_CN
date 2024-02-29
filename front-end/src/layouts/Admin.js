
import CreateNews from '../components/pages/Admin/CreateNews/CreateNews';
import HomeAdmin from '../components/pages/Admin/HomeAdmin/HomeAdmin';
import './Layout.css';
import { Route, Routes } from 'react-router-dom';

function Admin() {
  return (
    <div className="Admin">
         <Routes>
            <Route path="/create-news-by-ckeditor5" element={<CreateNews/>} />
            <Route path="/dashboard-admin" element={<HomeAdmin/>} />

          </Routes>
    </div>
  );
}

export default Admin;
