import logo from "../../../../assets/KTCN-in.png"
import { Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";

import { auth, signInWithGoogle, signOut, postToken} from "../../../../service/firebase";

import { User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, ScrollShadow, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

function Navbar() {

    const location = useLocation();

    const [user, setUser] = useState(null);
    const [Authdata, setAuth] = useState(null);

    const setActive = (href) => {
        if (location.pathname === href) return "Admin_tab-active";
        // if (location.pathname.startsWith(href)) return "Admin_tab-active";
        return "";
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const response = await postToken(user?.reloadUserInfo.email , user?.accessToken );
                setAuth(response.data)
                console.log(response.data);
                
                if(response.data === 0){ 
                    alert("Login failed");
                    await signOut(auth); 
                    setUser(null);
                } else {
                    sessionStorage.setItem("token", response.data);
                }
            } else {
                console.log("user is logged out");
                setUser(null);
            }
        });
    }, []);

    const handleLoginWithGoogle = async (onClose) => {
        try {
            await signInWithGoogle();
        
          //  window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    const handleLogout = async () => {
        try {
            await signOut(auth);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='Admin-Navbar flex flex-col w-[280px] h-[100vh] bg-slate-800 p-3 text-[white] justify-between'>
            <div className="grid grid-rows-[auto,auto] gap-2 h-[100vh] flex-1">
                <div className="flex gap-3 p-4 items-center h-fit">
                    <img src={logo} width={20} />
                    <span className="font-bold">SET</span>
                </div>
                <ScrollShadow className="flex-1" hideScrollBar style={{ height: "calc(100vh - 150px)" }}>
                    <div className="flex flex-col gap-2 overflow-auto">
                        <Link to="/admin" className={`text-[14px] w-full hover:bg-slate-600 p-3 py-2 rounded-lg flex justify-between items-center group/tab ${setActive("/admin")}`}>
                            <p><i className="fa-solid fa-bolt mr-3 w-4"></i>Tổng quan</p>
                            <i className="fa-solid fa-chevron-right text-[11px] hidden group-hover/tab:block"></i>
                        </Link>
                        <Link to="/admin/post" className={`text-[14px] w-full hover:bg-slate-600 p-3 py-2 rounded-lg flex justify-between items-center group/tab ${setActive("/admin/post")}`}>
                            <p><i className="fa-regular fa-images mr-3 w-4"></i>Quản lý bài viết</p>
                            <i className="fa-solid fa-chevron-right text-[11px] hidden group-hover/tab:block"></i>
                        </Link>
                        <Link to="/admin/category" className={`text-[14px] w-full hover:bg-slate-600 p-3 py-2 rounded-lg flex justify-between items-center group/tab ${setActive("/admin/category")}`}>
                            <p><i className="fa-solid fa-icons mr-3 w-4"></i>Quản lý thể loại</p>
                            <i className="fa-solid fa-chevron-right text-[11px] hidden group-hover/tab:block"></i>
                        </Link>
                        <Link to="/admin/user" className={`text-[14px] w-full hover:bg-slate-600 p-3 py-2 rounded-lg flex justify-between items-center group/tab ${setActive("/admin/user")}`}>
                            <p><i className="fa-regular fa-user mr-3 w-4"></i>Quản lý người dùng</p>
                            <i className="fa-solid fa-chevron-right text-[11px] hidden group-hover/tab:block"></i>
                        </Link>
                        <Link to="/admin/log" className={`text-[14px] w-full hover:bg-slate-600 p-3 py-2 rounded-lg flex justify-between items-center group/tab ${setActive("/admin/log")}`}>
                            <p><i className="fa-solid fa-clock-rotate-left mr-3 w-4"></i>Lịch sử thao tác</p>
                            <i className="fa-solid fa-chevron-right text-[11px] hidden group-hover/tab:block"></i>
                        </Link>

                    </div>
                </ScrollShadow>
            </div>
            <div className="h-fit">
                {
                    user ?

                        <Dropdown placement="bottom-start">
                            <DropdownTrigger>
                                <div className="flex items-center w-full justify-between hover:bg-slate-600 p-3 py-2 rounded-lg">
                                    <User
                                        name={<p className="font-semibold">{user.displayName}</p>}
                                        description={user.email}
                                        avatarProps={{
                                            src: user.photoURL
                                        }}
                                    />
                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="User Actions">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-bold">Đăng nhập với</p>
                                    <p className="font-bold">{user.email}</p>
                                </DropdownItem>
                                <DropdownSection showDivider>
                                    <DropdownItem key="settings">
                                        My Settings
                                    </DropdownItem>
                                </DropdownSection>
                                <DropdownItem key="logout" color="danger" startContent={<i className="fa-solid fa-right-from-bracket"></i>} onClick={() => { handleLogout() }}>
                                    Đăng xuất
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        : <Button color="primary" onClick={() => { handleLoginWithGoogle() }}>Đăng nhập</Button>
                }
            </div>
        </div>
    )
}

export default Navbar;