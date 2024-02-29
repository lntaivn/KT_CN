
import CreateNews from '../components/pages/Admin/CreateNews/CreateNews';
import './Layout.css';
import { Route, Routes } from 'react-router-dom';

function Admin() {
  return (
    <div className="Admin">
         <Routes>
            <Route path="/create-news-by-ckeditor5" element={<CreateNews/>} />
          </Routes>
    </div>
  );
}

export default Admin;
