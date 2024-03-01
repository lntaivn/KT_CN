import logo from "../../../../assets/KTCN-in.png"
import { Link } from 'react-router-dom';

import { User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, ScrollShadow } from "@nextui-org/react";

function Navbar() {
    return (
        <div className='Admin-Navbar flex flex-col w-[280px] h-[100vh] bg-gray-950 p-3 text-[white] justify-between'>
            <div className="grid grid-rows-[auto,auto] gap-2 h-[100vh] flex-1">
                <div className="flex gap-3 p-4 items-center h-fit">
                    <img src={logo} width={20} />
                    <span className="font-bold">SET</span>
                </div>
                <ScrollShadow className="flex-1" hideScrollBar style={{ height: "calc(100vh - 150px)" }}>
                    <div className="flex flex-col gap-2 overflow-auto">
                        <Link className="text-[14px] w-full hover:bg-zinc-900 p-3 py-2 rounded-lg flex justify-between items-center group/tab Admin_tab-active">
                            <p><i className="fa-regular fa-images mr-3 w-4"></i>Quản lý bài viết</p>
                            <i className="fa-solid fa-chevron-right text-[11px] hidden group-hover/tab:block"></i>
                        </Link>
                        <Link className="text-[14px] w-full hover:bg-zinc-900 p-3 py-2 rounded-lg flex justify-between items-center group/tab">
                            <p><i className="fa-solid fa-icons mr-3 w-4"></i>Quản lý thể loại</p>
                            <i className="fa-solid fa-chevron-right text-[11px] hidden group-hover/tab:block"></i>
                        </Link>
                        <Link className="text-[14px] w-full hover:bg-zinc-900 p-3 py-2 rounded-lg flex justify-between items-center group/tab">
                            <p><i className="fa-regular fa-user mr-3 w-4"></i>Quản lý người dùng</p>
                            <i className="fa-solid fa-chevron-right text-[11px] hidden group-hover/tab:block"></i>
                        </Link>
                        <Link className="text-[14px] w-full hover:bg-zinc-900 p-3 py-2 rounded-lg flex justify-between items-center group/tab">
                            <p><i className="fa-solid fa-clock-rotate-left mr-3 w-4"></i>Lịch sử thao tác</p>
                            <i className="fa-solid fa-chevron-right text-[11px] hidden group-hover/tab:block"></i>
                        </Link>
                    </div>
                </ScrollShadow>
            </div>
            <div className="h-fit">
                <Dropdown placement="bottom-start">
                    <DropdownTrigger>
                        <div className="flex items-center w-full justify-between hover:bg-zinc-900 p-3 py-2 rounded-lg">
                            <User
                                name={<p className="font-semibold">Ka Ka</p>}
                                description="kaka@gmail.com"
                                avatarProps={{
                                    src: "https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/278457256_685484812649669_6665721277885149812_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=9c7eae&_nc_eui2=AeErj7-GVczdw0bkhnjtFWIccucMPNH0Tcxy5ww80fRNzDmHej1WXYKri3qgoqG1H42bqWfgyjFhRodp8VzoPeTN&_nc_ohc=5SCl_AsF4xkAX-5htQv&_nc_ht=scontent.fsgn2-11.fna&oh=00_AfBiQEtJ3a9ks5p-JthcVrhJtpDCePLhbS9_jK44n8hOTQ&oe=65E5A68D"
                                }}
                            />
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </div>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User Actions">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-bold">Đăng nhập với</p>
                            <p className="font-bold">kaka@gmail.com</p>
                        </DropdownItem>
                        <DropdownSection showDivider>
                            <DropdownItem key="settings">
                                My Settings
                            </DropdownItem>
                        </DropdownSection>
                        <DropdownItem key="logout" color="danger" startContent={<i className="fa-solid fa-right-from-bracket"></i>}>
                            Đăng xuất
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    )
}

export default Navbar;