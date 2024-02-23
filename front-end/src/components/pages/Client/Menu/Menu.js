
import { Route, Routes, Link } from 'react-router-dom';
import LogoSET from "../../../../assets/KTCN-in.png"

import {
    Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem,
    NavbarMenu, NavbarContent, NavbarItem, Button, Avatar, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Tooltip, DropdownSection
} from "@nextui-org/react";

import { useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

function Menu() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { t, i18n } = useTranslation();

    const [selectedKeys, setSelectedKeys] = useState(new Set([i18n.language]));

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    return (
        <>
            <Navbar
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                maxWidth="2xl"
                classNames={{
                    base: "px-3 pl-6 md:px-10 bg-[#e95a13]",
                    wrapper: "px-0",
                    content: "gap-0",
                    item: "h-full items-center flex px-4 hover:bg-[white] hover:text-[#e95a13]"
                }}
                height="50px"
            >

                <NavbarContent className="lg:hidden flex gap-5" justify="start">
                    <NavbarMenuToggle className='text-[#fff]' />
                    <Link to="/">
                        <img src={LogoSET} width={20} className='mr-0' />
                    </Link>

                </NavbarContent>

                <NavbarContent className="hidden lg:flex text-[#fff]" justify="center">
                    <Link to="/">
                        <img src={LogoSET} width={20} className='mr-5' />
                    </Link>
                    <NavbarItem>
                        <Link to="#" className='font-medium uppercase text-[15px] h-full flex items-center'>
                            {t('menu.text_link_1')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="#" className='font-medium uppercase text-[15px] h-full flex items-center'>
                            {t('menu.text_link_2')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="#" className='font-medium uppercase text-[15px] h-full flex items-center'>
                            {t('menu.text_link_3')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="#" className='font-medium uppercase text-[15px] h-full flex items-center'>
                            {t('menu.text_link_4')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="#" className='font-medium uppercase text-[15px] h-full flex items-center'>
                            {t('menu.text_link_5')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="#" className='font-medium uppercase text-[15px] h-full flex items-center'>
                            {t('menu.text_link_6')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="#" className='font-medium uppercase text-[15px] h-full flex items-center'>
                            {t('menu.text_link_7')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="#" className='font-medium uppercase text-[15px] h-full flex items-center'>
                            {t('menu.text_link_8')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="#" className='font-medium uppercase text-[15px] h-full flex items-center'>
                            {t('menu.text_link_9')}
                        </Link>
                    </NavbarItem>
                </NavbarContent>

                <NavbarContent justify="end">
                    <Dropdown >
                        <DropdownTrigger className='lg:hidden'>
                            <Button
                                variant="light"
                                size='sm'
                                isIconOnly
                            >
                                <i className="fa-solid fa-ellipsis text-[white] text-[16px]"></i>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions"
                            classNames={{
                                list: "p-1"
                            }}
                            itemClasses={{
                                base: "w-[250px]"
                            }}
                        >
                            <DropdownSection title={t('menu.section_text_1')} showDivider>
                                <DropdownItem as={Link} to="http://tvu.edu.vn" endContent={<i className="fa-solid fa-angle-right"></i>}>{t('header.left_text_tvu')}</DropdownItem>
                                <DropdownItem as={Link} to="http://ttsv.tvu.edu.vn/" endContent={<i className="fa-solid fa-angle-right"></i>}>{t('header.left_text_1')}</DropdownItem>
                                <DropdownItem as={Link} to="http://daotao.tvu.edu.vn/" endContent={<i className="fa-solid fa-angle-right"></i>}>{t('header.left_text_2')}</DropdownItem>
                                <DropdownItem as={Link} to="http://khaothi.tvu.edu.vn/" endContent={<i className="fa-solid fa-angle-right"></i>}>{t('header.left_text_3')}</DropdownItem>
                                <DropdownItem as={Link} to="https://celri.tvu.edu.vn/" endContent={<i className="fa-solid fa-angle-right"></i>}>{t('header.left_text_4')}</DropdownItem>
                                <DropdownItem as={Link} to="http://ret.tvu.edu.vn" endContent={<i className="fa-solid fa-angle-right"></i>}>RET</DropdownItem>
                            </DropdownSection>
                            <DropdownSection title={t('menu.section_text_2')} className='mb-0'>
                                <DropdownItem as={Link} to="/login" endContent={<i className="fa-solid fa-angle-right"></i>}>{t('header.login_button_text')}</DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                        <DropdownTrigger className='lg:hidden'>
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
                                        <i className="fa-solid fa-caret-down text-[white]"></i>
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
                    <Button
                        isIconOnly
                        variant='light'
                    >
                        <i className="fa-solid fa-magnifying-glass text-[#fff] text-lg"></i>
                    </Button>
                </NavbarContent>

                <NavbarMenu className='pt-5 gap-4'>
                    <NavbarMenuItem>
                        <Link to="#" className='font-medium uppercase'>
                            {t('menu.text_link_1')}
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <Link to="#" className='font-medium uppercase'>
                            {t('menu.text_link_2')}
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <Link to="#" className='font-medium uppercase'>
                            {t('menu.text_link_3')}
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <Link to="#" className='font-medium uppercase'>
                            {t('menu.text_link_4')}
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <Link to="#" className='font-medium uppercase'>
                            {t('menu.text_link_5')}
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <Link to="#" className='font-medium uppercase'>
                            {t('menu.text_link_6')}
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <Link to="#" className='font-medium uppercase'>
                            {t('menu.text_link_7')}
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <Link to="#" className='font-medium uppercase'>
                            {t('menu.text_link_8')}
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <Link to="#" className='font-medium uppercase'>
                            {t('menu.text_link_9')}
                        </Link>
                    </NavbarMenuItem>
                </NavbarMenu>
            </Navbar >
        </>
    );
}

export default Menu;
