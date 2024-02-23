
import './Header.css';
import { Link } from 'react-router-dom';
import {
    Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem,
    NavbarContent, NavbarItem, Button, Avatar,
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip
}
    from "@nextui-org/react";

// import { Tooltip } from 'antd';

import { useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

function Header() {

    const { t, i18n } = useTranslation();

    const [selectedKeys, setSelectedKeys] = useState(new Set([i18n.language]));

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    return (
        <div className="Header">
            <Navbar
                disableAnimation
                // isBordered
                maxWidth="full"
                classNames={{
                    base: "px-4 h-12",
                    wrapper: "px-0",
                }}
            >
                <NavbarContent className="hidden sm:flex gap-4text-xs" justify="center">
                    <NavbarBrand>
                        <Link to="http://www.tvu.edu.vn/">
                            <p className="font-bold text-inherit text-sm">{t('header.left_text_tvu')}</p>
                        </Link>
                    </NavbarBrand>
                    <NavbarItem>
                        <Link className='text-[14px] text-orange-500 font-normal' to="http://ttsv.tvu.edu.vn/">
                            {t('header.left_text_1')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className='text-[14px] text-orange-500 font-normal' to="http://daotao.tvu.edu.vn/">
                            {t('header.left_text_2')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className='text-[14px] text-orange-500 font-normal' to="http://khaothi.tvu.edu.vn/">
                            {t('header.left_text_3')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className='text-[14px] text-orange-500 font-normal' to="https://celri.tvu.edu.vn/">
                            {t('header.left_text_4')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className='text-[14px] text-orange-500 font-normal' to="http://ret.tvu.edu.vn/">
                            RET
                        </Link>
                    </NavbarItem>
                </NavbarContent>

                <NavbarContent justify="end" className='gap-2'>
                    <NavbarItem>
                        <Link variant="default" className="font-semibold text-sm hidden sm:flex text-orange-500" to="/login">
                            {t('header.login_button_text')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="light"
                                    size='sm'
                                >
                                    <Tooltip content={t('header.tooltip_text')} radius="sm" showArrow color="primary">
                                        <div className='flex gap-2 items-center'>
                                            {selectedValue === "vi" ?
                                                <Avatar alt="Việt Nam" className="w-5 h-5" src="https://flagcdn.com/vn.svg" /> :
                                                <Avatar alt="English" className="w-5 h-5" src="https://flagcdn.com/us.svg" />
                                            }
                                            <i className="fa-solid fa-caret-down"></i>
                                        </div>
                                    </Tooltip>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedKeys}
                                onSelectionChange={setSelectedKeys}
                            >
                                <DropdownItem
                                    key="vi"
                                    startContent={<Avatar alt="Việt Nam" className="w-5 h-5" src="https://flagcdn.com/vn.svg" />}
                                    onClick={() => i18n.changeLanguage("vi")}
                                >
                                    Tiếng Việt
                                </DropdownItem>
                                <DropdownItem
                                    key="en"
                                    startContent={<Avatar alt="English" className="w-5 h-5" src="https://flagcdn.com/us.svg" />
                                    }
                                    onClick={() => i18n.changeLanguage('en')}
                                >
                                    English
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </div>
    );
}

export default Header;
