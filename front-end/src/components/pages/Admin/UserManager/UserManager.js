
import { Avatar, BreadcrumbItem, Breadcrumbs, Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { useMemo, useState, useEffect } from 'react';

import { Link, Route, Routes } from 'react-router-dom';
import { addUser, getAllUser, updateRoleUser } from '../../../../service/UserService';
function UserManager() {

    const [newUser, setNewUser] = useState("");
    const [notification, setNotification] = useState('');
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getAllUser();
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    const handleAddUser = async () => {
        try {
            const response = await addUser(newUser);
            console.log(response.data);
        } catch (error) {
            console.log(error);        
        }
    };
    return (
        <div className='flex flex-col gap-10 w-full'>
            <Breadcrumbs underline="hover">
                <BreadcrumbItem>Admin Dashboard</BreadcrumbItem>
                <BreadcrumbItem>Quản lý người dùng</BreadcrumbItem>
            </Breadcrumbs>
            <div className='w-3/5 min-w-[500px] m-auto flex flex-col gap-6'>
                <div className='flex w-full gap-2'>
                    <Input
                        placeholder="kaka@example.com"
                        labelPlacement="outside"
                        variant='faded'
                        startContent={<i className="fa-solid fa-user opacity-60 mr-1"></i>}
                        value={newUser}
                        onValueChange={setNewUser}
                        isClearable
                        radius='sm'
                        type='email'
                    />
                    <Button radius='sm' className='text-[white] font-medium bg-green-500' onClick={handleAddUser}>
                        Thêm
                    </Button>
                </div>
                <div className='flex flex-col gap-3'>
                    {users.map(user => (
                        <User key={user.id_user} user={user} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserManager;

function User({ user }) {
    const [selectedKeys, setSelectedKeys] = useState(new Set(user.role === 1 ? ["Super Admin"] : ["Admin"]));
    const selectedValue = useMemo(() => Array.from(selectedKeys).join(", ").replaceAll("_", " "), [selectedKeys]);

    const handleChangeRole = async (newSelectedKeys) => {
        try {
            const newRole = newSelectedKeys.has("Super Admin") ? "SuperAdmin" : "Admin";
            const data = {
                id_user: user.id_user,
                role: newRole
            }
            console.log(data);
            await updateRoleUser(data);
            setSelectedKeys(newSelectedKeys);
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };
    return (
        <div className='flex items-center justify-between p-2 rounded-lg px-3 hover:bg-zinc-100 p-l-4'>
            <div className='flex items-center gap-2'>
                <Avatar className="w-9 h-9 cursor-pointer" src={user.photoURL} />
                <div className="flex flex-col">
                    {user.name ? (
                        <span className="text-[15px] font-semibold">{user.name}</span>
                    ) : (
                        <span className="text-[12px] text-yellow-500 mb-[1px]">
                            <i className="fa-solid fa-triangle-exclamation mr-1"></i>
                            Chưa đăng nhập
                        </span>
                    )}
                    <p className={`text-[13px] opacity-70 -mt-1`}>{user.email}</p>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <Dropdown className='scale-90'>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            className="capitalize"
                            size='sm'
                        >
                            {selectedValue}<i className="fa-solid fa-caret-down"></i>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        onSelectionChange={handleChangeRole}
                    >
                        <DropdownItem key="Admin">Admin</DropdownItem>
                        <DropdownItem key="Super Admin">Super Admin</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Button isIconOnly size='sm' radius='full' variant='light' color='danger'><i className="fa-regular fa-trash-can"></i></Button>
            </div>
        </div>
    );
}