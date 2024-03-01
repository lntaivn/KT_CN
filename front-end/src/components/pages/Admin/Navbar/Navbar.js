import logo from "../../../../assets/KTCN-in.png"
import { Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";

import { auth, signInWithGoogle, signOut } from "../../../../service/firebase";

import { User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, ScrollShadow, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Tooltip } from "antd";

function Navbar(props) {

    const location = useLocation();
    const { collapsedNav, setCollapsedNav } = props;

    const [user, setUser] = useState(null);

    const setActive = (href) => {
        if (location.pathname === href) return "Admin_tab-active";
        // if (location.pathname.startsWith(href)) return "Admin_tab-active";
        return "";
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                console.log(user);
            } else {
                console.log("user is logged out");
            }
        });
    }, []);

    const handleLoginWithGoogle = async (onClose) => {
        try {
            await signInWithGoogle();
            window.location.reload();
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

    const handleToggleNav = () => {
        setCollapsedNav(!collapsedNav);
    }

    return (
        <div className={`Admin-Navbar flex flex-col w-[${collapsedNav ? "80px" : "270px"}] h-[100vh] bg-slate-800 p-3 text-[white] justify-between`}>
            <div className="grid grid-rows-[auto,auto] gap-2 h-[100vh] flex-1">
                <div className={`flex w-full justify-${collapsedNav ? "center" : "between"} items-center p-${collapsedNav ? "2" : "4"}`}>
                    {!collapsedNav &&
                        <div className="flex gap-3 items-center h-fit">
                            <img src={logo} width={20} />
                            <span className="font-bold">SET</span>
                        </div>
                    }
                    <Tooltip title={collapsedNav ? "Mở rộng" : "Thu gọn"} placement="right">
                        <Button isIconOnly variant="light" radius="full" onClick={() => { handleToggleNav() }}>
                            {collapsedNav ? <i className="fa-solid fa-chevron-right text-[white]"></i>
                                : <i className="fa-solid fa-chevron-left text-[white]"></i>}
                        </Button>
                    </Tooltip>
                </div>
                <ScrollShadow className="flex-1" hideScrollBar style={{ height: "calc(100vh - 160px)" }}>
                    <div className="flex flex-col gap-2 overflow-auto">
                        <Tooltip title={collapsedNav ? "Tổng quan" : ""} placement="right">
                            <Link to="/admin" className={`text-[14px] w-full hover:bg-slate-600 p-3 py-2 rounded-lg flex justify-${collapsedNav ? "center" : "between"} items-center group/tab ${setActive("/admin")}`}>
                                <p><i className={`fa-solid fa-bolt mr-${collapsedNav ? "0" : "3"} w-4`}></i>{!collapsedNav && "Tổng quan"}</p>
                                {!collapsedNav && <i className="fa-solid fa-chevron-right text-[11px] hidden group-hover/tab:block"></i>}
                            </Link>
                        </Tooltip>
                        <Tooltip title={collapsedNav ? "Quản lý bài viết" : ""} placement="right">
                            <Link to="/admin/post" className={`text-[14px] w-full hover:bg-slate-600 p-3 py-2 rounded-lg flex justify-${collapsedNav ? "center" : "between"} items-center group/tab ${setActive("/admin/post")}`}>
                                <p><i className={`fa-regular fa-images mr-${collapsedNav ? "0" : "3"} w-4`}></i>{!collapsedNav && "Quản lý bài viết"}</p>
                                {!collapsedNav && <i className="fa-solid fa-chevron-right text-[11px] hidden group-hover/tab:block"></i>}
                            </Link>
                        </Tooltip>
                        <Tooltip title={collapsedNav ? "Quản lý thể loại" : ""} placement="right">
                            <Link to="/admin/category" className={`text-[14px] w-full hover:bg-slate-600 p-3 py-2 rounded-lg flex justify-${collapsedNav ? "center" : "between"} items-center group/tab ${setActive("/admin/category")}`}>
                                <p><i className={`fa-solid fa-icons mr-${collapsedNav ? "0" : "3"} w-4`}></i>{!collapsedNav && "Quản lý thể loại"}</p>
                                {!collapsedNav && <i className="fa-solid fa-chevron-right text-[11px] hidden group-hover/tab:block"></i>}
                            </Link>
                        </Tooltip>
                        <Tooltip title={collapsedNav ? "Quản lý người dùng" : ""} placement="right">
                            <Link to="/admin/user" className={`text-[14px] w-full hover:bg-slate-600 p-3 py-2 rounded-lg flex justify-${collapsedNav ? "center" : "between"} items-center group/tab ${setActive("/admin/user")}`}>
                                <p><i className={`fa-regular fa-user mr-${collapsedNav ? "0" : "3"} w-4`}></i>{!collapsedNav && "Quản lý người dùng"}</p>
                                {!collapsedNav && <i className="fa-solid fa-chevron-right text-[11px] hidden group-hover/tab:block"></i>}
                            </Link>
                        </Tooltip>
                        <Tooltip title={collapsedNav ? "Lịch sử thao tác" : ""} placement="right">
                            <Link to="/admin/log" className={`text-[14px] w-full hover:bg-slate-600 p-3 py-2 rounded-lg flex justify-${collapsedNav ? "center" : "between"} items-center group/tab ${setActive("/admin/log")}`}>
                                <p><i className={`fa-solid fa-clock-rotate-left mr-${collapsedNav ? "0" : "3"} w-4`}></i>{!collapsedNav && "Lịch sử thao tác"}</p>
                                {!collapsedNav && <i className="fa-solid fa-chevron-right text-[11px] hidden group-hover/tab:block"></i>}
                            </Link>
                        </Tooltip>
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
                                        name={!collapsedNav ? <p className="font-semibold">{user.displayName}</p> : ""}
                                        description={!collapsedNav ? user.email : ""}
                                        avatarProps={{
                                            src: user.photoURL
                                        }}
                                        classNames={{
                                            base: `${collapsedNav ? "gap-0" : "gap-2"}`
                                        }}
                                    />
                                    {!collapsedNav ? <i className="fa-solid fa-ellipsis-vertical"></i> : null}
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="User Actions" classNames={{
                                base: "w-[230px]"
                            }}>
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
                        </Dropdown> :
                        <Button color="primary" className="w-full" onClick={() => { handleLoginWithGoogle() }} isIconOnly={collapsedNav}>
                            {collapsedNav ? <i class="fa-solid fa-right-to-bracket"></i> : "Đăng nhập"}
                        </Button>
                }
            </div>
        </div>
    )
}

export default Navbar;