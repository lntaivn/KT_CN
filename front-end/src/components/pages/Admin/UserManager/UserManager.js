
import { Avatar, BreadcrumbItem, Breadcrumbs, Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

function UserManager() {

    const [newUser, setNewUser] = useState("");

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
                    />
                    <Button radius='sm' className='text-[white] font-medium bg-green-500'>
                        Thêm
                    </Button>
                </div>
                <div className='flex flex-col gap-3'>
                    <User />
                    <User />
                    <User />
                    <User pending={true} />
                </div>
            </div>
        </div>
    );
}

export default UserManager;

function User(props) {

    const { pending } = props;

    const [selectedKeys, setSelectedKeys] = useState(new Set(["Admin"]));

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    return (
        <div className='flex items-center justify-between p-2 rounded-lg px-3 hover:bg-zinc-100 p-l-4'>
            <div className='flex items-center gap-2'>
                <Avatar className="w-9 h-9 cursor-pointer" src="https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-1/416123707_1056694625528684_2294956291004952905_n.jpg?stp=dst-jpg_p320x320&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=8g9Y4UOtbLUAX_4CnHV&_nc_ht=scontent.fsgn5-13.fna&oh=00_AfDBo-9Ha8mXhPOCt21obukiphEpNAEaJEI7NiIgindkIw&oe=65EB38B2" />
                <div className="flex flex-col">
                    {!pending ? <span className="text-[15px] font-semibold">Ka Ka</span> :
                        pending &&
                        <span className="text-[12px] text-yellow-500 mb-[1px]">
                            <i className="fa-solid fa-triangle-exclamation mr-1"></i>
                            Chưa đăng nhập
                        </span>
                    }
                    <p className={`text-[13px] opacity-70 -mt-1`}>kakanvk@gmail.com</p>
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
                        onSelectionChange={setSelectedKeys}
                    >
                        <DropdownItem key="Admin">Admin</DropdownItem>
                        <DropdownItem key="Super Admin">Super Admin</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Button isIconOnly size='sm' radius='full' variant='light' color='danger'><i className="fa-regular fa-trash-can"></i></Button>
            </div>
        </div>
    )
}