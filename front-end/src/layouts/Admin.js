
import logo from "../assets/KTCN-in.png"
import CreateNews from '../components/pages/Admin/CreateNews/CreateNews';
import UpdateNews from '../components/pages/Admin/UpdateNews/UpdateNews';
import './Layout.css';
import { Link, Route, Routes } from 'react-router-dom';
import Navbar from "../components/pages/Admin/Navbar/Navbar";
import Post from "../components/pages/Admin/Post/Post";
import { useState } from "react";
import { message, Spin } from 'antd';
import UserManager from "../components/pages/Admin/UserManager/UserManager";
import PostStored from "../components/pages/Admin/Post/PostStored";

function Admin() {

  const [collapsedNav, setCollapsedNav] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [spinning, setSpinning] = useState(false);

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
      <Navbar collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} setSpinning={setSpinning}/>
      <div className='Admin-Content flex-1 h-full overflow-auto p-5 px-7'>
        <Routes>
          <Route path="/post" element={<Post successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning}/>} />
          <Route path="/post/stored" element={<PostStored successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning}/>} />
          <Route path="/post/create" element={<CreateNews collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} />} />
          <Route path="/post/update/:id" element={<UpdateNews collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav}/>} />
          <Route path="/user" element={<UserManager successNoti={successNoti} errorNoti={errorNoti}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
