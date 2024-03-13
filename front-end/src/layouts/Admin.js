
import logo from "../assets/KTCN-in.png"
import './Layout.css';
import { Link, Route, Routes } from 'react-router-dom';
import Navbar from "../components/pages/Admin/Navbar/Navbar";
import Post from "../components/pages/Admin/Post/Post";
import { useState } from "react";
import { message, Spin } from 'antd';
import UserManager from "../components/pages/Admin/UserManager/UserManager";
import PostStored from "../components/pages/Admin/Post/PostStored";
import CategoryManager from "../components/pages/Admin/CategoryManager/CategoryManager";
import UpdatePost from "../components/pages/Admin/Post/UpdatePost";
import CreatePost from "../components/pages/Admin/Post/CreatePost";
import PostCategory from "../components/pages/Admin/CategoryManager/PostCategory";
import UpdateCategory from "../components/pages/Admin/CategoryManager/UpdateCategory";

function Admin(props) {

  const [collapsedNav, setCollapsedNav] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [spinning, setSpinning] = useState(false);

  const { user } = props;

  const successNoti = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };
  const errorNoti = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };

  return (
    <div className="Admin flex h-[100vh]">
      {contextHolder}
      <Spin spinning={spinning} fullscreen />
      <Navbar collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} setSpinning={setSpinning} user={user}/>
      <div className='Admin-Content flex-1 h-full overflow-auto p-5 px-7'>
        <Routes>
          <Route path="/post" element={<Post successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning} TypeNews={"News"} />} />
          <Route path="/postAdmissions" element={<Post successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning} TypeNews={"admissionNews"} />} />
          <Route path="/post/stored" element={<PostStored successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning} TypeNews={"News"} />} />
          <Route path="/postAdmissions/storedAdmissions" element={<PostStored successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning} TypeNews={"admissionNews"} />} />

          <Route path="/post/create" element={<CreatePost collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} TypeNews={"News"}/>} />
          <Route path="/post/createAdmissions" element={<CreatePost collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} TypeNews={"admissionNews"}/>} />
          
          <Route path="/post/update/:id" element={<UpdatePost collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} setSpinning={setSpinning} successNoti={successNoti} errorNoti={errorNoti} TypeNews={"News"}/>} />
          <Route path="/post/updateAdmissions/:id" element={<UpdatePost collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} setSpinning={setSpinning} successNoti={successNoti} errorNoti={errorNoti} TypeNews={"admissionNews"}/>} />

         
          <Route path="/category" element={<CategoryManager successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning}/>} />
          <Route path="/category/create" element={<PostCategory successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning}/>} />
          <Route path="/category/update/:id" element={<UpdateCategory successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning}/>} />

          <Route path="/user" element={<UserManager successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
