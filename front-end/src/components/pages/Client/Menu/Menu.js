
import { Route, Routes, Link } from 'react-router-dom';

import {
    Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem,
    NavbarMenu, NavbarContent, NavbarItem, Button
} from "@nextui-org/react";

import { useState } from 'react';

import { useTranslation } from 'react-i18next';

function Menu() {

    const { t } = useTranslation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    return (
        <>
            <Navbar
                isBordered
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                maxWidth="2xl"
                classNames={{
                    base: "px-8 bg-[#e95a13]",
                    wrapper: "px-0",
                }}
                height="50px"
            >
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-7 text-[#fff]" justify="center">
                    <NavbarItem>
                        <Link to="#" className='font-medium uppercase'>
                            {t('menu.text_link_1')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="#" className='font-medium uppercase'>
                            {t('menu.text_link_2')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="#" className='font-medium uppercase'>
                            {t('menu.text_link_3')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="#" className='font-medium uppercase'>
                            {t('menu.text_link_4')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="#" className='font-medium uppercase'>
                            {t('menu.text_link_5')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="#" className='font-medium uppercase'>
                            {t('menu.text_link_6')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="#" className='font-medium uppercase'>
                            {t('menu.text_link_7')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="#" className='font-medium uppercase'>
                            {t('menu.text_link_8')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="#" className='font-medium uppercase'>
                            {t('menu.text_link_9')}
                        </Link>
                    </NavbarItem>
                </NavbarContent>

                <NavbarContent justify="end">
                    <NavbarItem >
                        <Button
                            isIconOnly
                            variant='light'
                        >
                            <i className="fa-solid fa-magnifying-glass text-[#fff] text-lg"></i>
                        </Button>
                    </NavbarItem>
                </NavbarContent>

                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                className="w-full"
                                color={
                                    index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                                }
                                href="#"
                                size="lg"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
        </>
    );
}

export default Menu;
