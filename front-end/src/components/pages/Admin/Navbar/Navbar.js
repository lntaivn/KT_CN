import logo from "../../../../assets/KTCN-in.png"
import { Await, Link, useLocation} from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import Cookies from 'js-cookie';

import { auth, signInWithGoogle, signOut, postToken, logoutToken } from "../../../../service/firebase";

import { User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, ScrollShadow, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { motion } from "framer-motion";

function Navbar(props) {

    const location = useLocation();
    const { collapsedNav, setCollapsedNav } = props;

    const [currentUser, setCurrentUser] = useState(null);
    const [Authdata, setAuth] = useState(null);

    const setActive = (href) => {
        if (location.pathname === href) return "Admin_tab-active";
        // if (location.pathname.startsWith(href)) return "Admin_tab-active";
        return "";
    }

    const navTab = [
        {
            text: "Tổng quan",
            link: "/admin",
            icon: <i className={`fa-solid fa-bolt mr-${collapsedNav ? "0" : "3"} w-4`}></i>
        },
        {
            text: "Quản lý bài viết",
            link: "/admin/post",
            icon: <i className={`fa-regular fa-images mr-${collapsedNav ? "0" : "3"} w-4`}></i>
        },
        {
            text: "Quản lý thể loại",
            link: "/admin/category",
            icon: <i className={`fa-solid fa-icons mr-${collapsedNav ? "0" : "3"} w-4`}></i>
        },
        {
            text: "Quản lý người dùng",
            link: "/admin/user",
            icon: <i className={`fa-regular fa-user mr-${collapsedNav ? "0" : "3"} w-4`}></i>
        },
        {
            text: "Lịch sử thao tác",
            link: "/admin/log",
            icon: <i className={`fa-solid fa-clock-rotate-left mr-${collapsedNav ? "0" : "3"} w-4`}></i>
        }
    ]

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                console.log("user is logged out");
                setCurrentUser(null);
            }
        });
    }, []);

    const handleLoginWithGoogle = async (onClose) => {
        try {
            const user = await signInWithGoogle();

            await postToken(user.email);

            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    const handleLogout = async () => {
        try {
            await signOut(auth);
            await logoutToken();

            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    const handleToggleNav = () => {
        setCollapsedNav(!collapsedNav);
    }

    return (
        <motion.div
            className={`Admin-Navbar flex flex-col w-["270px"] ${collapsedNav ? "w-[87px]" : ""} h-[100vh] bg-slate-800 p-3 text-[white] justify-between`}
            initial={{ width: "270px" }}
            animate={{ width: collapsedNav ? "87px" : "270px" }}
            transition={{ duration: 0.4 }}
        >
            <div className="grid grid-rows-[auto,auto] h-[100vh] flex-1">
                <div className={`flex w-full h-[50px] justify-${collapsedNav ? "center" : "between"} items-center p-${collapsedNav ? "2" : "3"}`}>
                    <motion.div
                        className="flex gap-3 items-center h-fit"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: collapsedNav ? 0 : 1 }}
                        transition={{ duration: collapsedNav ? 0 : 0.4, delay: collapsedNav ? 0 : 0.4 }}
                    >
                        {
                            !collapsedNav ?
                                <>
                                    <img src={logo} width={20} alt="" />
                                    <span className="font-bold mt-[1px]">SET</span>
                                </> : ""
                        }
                    </motion.div>
                    <Tooltip title={collapsedNav ? "Mở rộng" : "Thu gọn"} placement="right">
                        <Button isIconOnly variant="light" radius="full" onClick={() => { handleToggleNav() }}>
                            {collapsedNav ? <i className="fa-solid fa-chevron-right text-[white]"></i>
                                : <i className="fa-solid fa-chevron-left text-[white]"></i>}
                        </Button>
                    </Tooltip>
                </div>
                <ScrollShadow className="flex-1" hideScrollBar style={{ height: "calc(100vh - 130px)" }}>
                    <div className="flex flex-col gap-2 overflow-auto overflow-x-hidden">
                        <hr className="opacity-10 m-auto w-[30px] px-2 mb-2 border-[1.5px]" />
                        {
                            navTab.map((tab) => {
                                return (
                                    <Tooltip Tooltip title={collapsedNav ? tab.text : ""} placement="right" key={tab.link}>
                                        <Link to={tab.link} className={`text-[14px] w-full h-[37px] hover:bg-slate-600 p-3 py-2 rounded-lg flex justify-${collapsedNav ? "center" : "between"} items-center group/tab ${setActive(tab.link)}`}>
                                            <p className="flex items-center">
                                                {tab.icon}
                                                <motion.span
                                                    initial={{ opacity: 1 }}
                                                    animate={{ opacity: collapsedNav ? 0 : 1 }}
                                                    transition={{ duration: collapsedNav ? 0 : 0.4, delay: collapsedNav ? 0 : 0.4 }}
                                                    style={{ whiteSpace: "nowrap" }}
                                                >
                                                    {!collapsedNav && tab.text}
                                                </motion.span>
                                            </p>
                                            {!collapsedNav && <i className="fa-solid fa-chevron-right text-[11px] hidden group-hover/tab:block"></i>}
                                        </Link>
                                    </Tooltip>
                                )
                            })
                        }
                    </div>
                </ScrollShadow>
            </div >
            <div className="h-fit">
                {
                    currentUser ?
                        <Dropdown placement="bottom-start">
                            <DropdownTrigger>
                                <div className="flex items-center w-full justify-between hover:bg-slate-600 p-3 py-2 rounded-lg">
                                    <User
                                        name={!collapsedNav ? <p className="font-semibold">{currentUser.displayName}</p> : ""}
                                        description={!collapsedNav ? currentUser.email : ""}
                                        avatarProps={{
                                            src: currentUser.photoURL
                                        }}
                                        classNames={{
                                            base: `${collapsedNav ? "gap-0" : "gap-2"}`
                                        }}
                                    />
                                    {!collapsedNav ? <i className="fa-solid fa-ellipsis-vertical"></i> : null}
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="User Actions" classNames={{
                                base: "min-w-[230px]"
                            }}>
                                <DropdownItem key="profile" className="h-14 gap-2" isReadOnly>
                                    <p className="font-semibold opacity-50">Admin</p>
                                    <p className="font-bold">{currentUser.email}</p>
                                </DropdownItem>
                                <DropdownSection showDivider>
                                    <DropdownItem key="settings" startContent={<i className="fa-solid fa-gear"></i>}>
                                        Cài đặt
                                    </DropdownItem>
                                </DropdownSection>
                                <DropdownItem key="logout" color="danger" startContent={<i className="fa-solid fa-right-from-bracket"></i>} onClick={() => { handleLogout() }}>
                                    Đăng xuất
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown> :
                        <Button color="primary" className="w-full" onClick={() => { handleLoginWithGoogle() }} isIconOnly={collapsedNav}>
                            {collapsedNav ? <i className="fa-solid fa-right-to-bracket"></i> : "Đăng nhập"}
                        </Button>
                }
            </div>
        </motion.div >
    )
}

export default Navbar;