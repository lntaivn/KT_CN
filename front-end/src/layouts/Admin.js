
import Ckeditor from '../components/pages/Admin/Ckeditor/Ckeditor';
import './Layout.css';
import { Route, Routes } from 'react-router-dom';

function Admin() {
  return (
    <div className="Admin">
         <Routes>
            <Route path="/create-news-by-ckeditor5" element={<Ckeditor/>} />
          </Routes>
    </div>
  );
}

export default Admin;
