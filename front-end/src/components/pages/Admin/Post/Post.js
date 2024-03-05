import "./Post.css";
import { useEffect, useState } from "react";
import { ListNews, UpdateStatusVi, UpdateStatusEn, GetAllCategories, UpdateStatuses } from "../../../../service/ApiService";

import { Link } from "react-router-dom";
import moment from 'moment';
import { Table, Tooltip, Image, Spin } from 'antd';
import { Avatar, BreadcrumbItem, Breadcrumbs, Button, Switch, User } from "@nextui-org/react";
import { getCurrentUser } from "../../../../service/LoginService";

const Post = (props) => {

    const { successNoti, errorNoti } = props;

    const [newsListData, setNewsListData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [spinning, setSpinning] = useState(false);

    const [selectedRow, setSelectedRow] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const columns = [
        {
            title: 'Ảnh bìa',
            dataIndex: 'thumbnail',
            render: (text) =>
                <Image
                    width={100}
                    src={text}
                    className="rounded"
                />
        },
        {
            title: 'Tiêu đề bài viết',
            dataIndex: 'name_group',
            render: (record) =>
                <div className="text-sm">
                    <p className="font-medium">{record.title_vi}</p>
                    <p className="text-[12px] opacity-70 mt-1">{record.title_en}</p>
                </div>
        },
        {
            title: 'Thời gian',
            dataIndex: 'date',
            width: "150px",
            render: (record) =>
                <div className="text-[12px] flex flex-col gap-3">
                    <div>
                        <span className="opacity-70">Ngày tạo:</span>
                        <p className="font-medium text-[13px]">{record.created_at}</p>
                        <div className="flex items-center gap-[5px]">
                            <span className="opacity-70">bởi</span>
                            <Tooltip
                                className="bg-[white]"
                                title={
                                    <div className="flex items-center gap-2">
                                        <Avatar className="w-7 h-7 cursor-pointer" src="https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-1/416123707_1056694625528684_2294956291004952905_n.jpg?stp=dst-jpg_p320x320&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=8g9Y4UOtbLUAX_4CnHV&_nc_ht=scontent.fsgn5-13.fna&oh=00_AfDBo-9Ha8mXhPOCt21obukiphEpNAEaJEI7NiIgindkIw&oe=65EB38B2" />
                                        <div className="flex flex-col">
                                            <span className="text-[13px] font-semibold">Ka Ka</span>
                                            <p className="text-[11px] opacity-70 -mt-1">kakanvk@gmail.com</p>
                                        </div>
                                    </div>
                                }
                            >
                                <Avatar className="w-5 h-5 cursor-pointer" src="https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-1/416123707_1056694625528684_2294956291004952905_n.jpg?stp=dst-jpg_p320x320&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=8g9Y4UOtbLUAX_4CnHV&_nc_ht=scontent.fsgn5-13.fna&oh=00_AfDBo-9Ha8mXhPOCt21obukiphEpNAEaJEI7NiIgindkIw&oe=65EB38B2" />
                            </Tooltip>
                        </div>
                    </div>
                    <div>
                        <span className="opacity-70">Cập nhật lần cuối:</span>
                        <p className="font-medium text-[13px]">{record.updated_at}</p>
                        <div className="flex items-center gap-[5px]">
                            <span className="opacity-70">bởi</span>
                            <Tooltip
                                className="bg-[white]"
                                title={
                                    <div className="flex items-center gap-2">
                                        <Avatar className="w-7 h-7 cursor-pointer" src="https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-1/416123707_1056694625528684_2294956291004952905_n.jpg?stp=dst-jpg_p320x320&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=8g9Y4UOtbLUAX_4CnHV&_nc_ht=scontent.fsgn5-13.fna&oh=00_AfDBo-9Ha8mXhPOCt21obukiphEpNAEaJEI7NiIgindkIw&oe=65EB38B2" />
                                        <div className="flex flex-col">
                                            <span className="text-[13px] font-semibold">Ka Ka</span>
                                            <p className="text-[11px] opacity-70 -mt-1">kakanvk@gmail.com</p>
                                        </div>
                                    </div>
                                }
                            >
                                <Avatar className="w-5 h-5 cursor-pointer" src="https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-1/416123707_1056694625528684_2294956291004952905_n.jpg?stp=dst-jpg_p320x320&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=8g9Y4UOtbLUAX_4CnHV&_nc_ht=scontent.fsgn5-13.fna&oh=00_AfDBo-9Ha8mXhPOCt21obukiphEpNAEaJEI7NiIgindkIw&oe=65EB38B2" />
                            </Tooltip>
                        </div>
                    </div>
                </div>
        },
        {
            title:
                <Tooltip title="Danh mục">
                    <i className="fa-solid fa-icons text-[16px]"></i>
                </Tooltip>,
            dataIndex: 'category',
            render: (record) =>
                <div className="text-sm">
                    <p className="font-medium">{record.vi}</p>
                    <p className="text-[12px] opacity-70 mt-1">{record.en}</p>
                </div>,
            filters: categoryData,
            onFilter: (value, record) => record.category.id === value,
        },
        {
            title:
                <div className="flex items-center justify-center w-full">
                    <Tooltip title="Lượt xem">
                        <i className="fa-solid fa-eye text-[16px]" ></i>
                    </Tooltip>
                </div>,
            dataIndex: 'view_count',
            render: (record) =>
                <div className="flex items-center justify-center w-full">
                    {record.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </div>
        },
        {
            title:
                <div className="flex items-center justify-center w-full">
                    <Tooltip title="Ẩn/hiện VN">
                        <Avatar alt="Việt Nam" className="w-5 h-5" src="https://flagcdn.com/vn.svg" />
                    </Tooltip>
                </div>,
            dataIndex: 'status_vi',
            render: (record) =>
                <div className="flex items-center justify-center w-full">
                    <Switch
                        key={record.id}
                        size="sm"
                        classNames={{
                            wrapper: "mr-0"
                        }}
                        isSelected={record.value}
                        onClick={() => handleUpdateStatus_vi(record.id)}
                        className="scale-80"
                    ></Switch>
                </div>
        },
        {
            title:
                <div className="flex items-center justify-center w-full">
                    <Tooltip title="Ẩn/hiện EN">
                        <Avatar alt="Engish" className="w-5 h-5" src="https://flagcdn.com/gb.svg" />
                    </Tooltip>
                </div>,
            dataIndex: 'status_en',
            render: (record) =>
                <div className="flex items-center justify-center w-full">
                    <Switch
                        size="sm"
                        isSelected={record.value}
                        classNames={{
                            wrapper: "mr-0"
                        }}
                        onClick={() => handleUpdateStatus_en(record.id)}
                        className="scale-80"
                    ></Switch>
                </div>
        },
        {
            title:
                <div className="flex items-center justify-center w-full">
                    <i className="fa-solid fa-bars text-[18px]"></i>
                </div>,
            dataIndex: 'action',
            render: (_id) =>
                <div className="flex flex-col items-center justify-center w-full gap-2">
                    <Tooltip title="Chỉnh sửa">
                        <Button isIconOnly variant="light" radius="full" size="sm" as={Link} to={`update/${_id}`}>
                            <i className="fa-solid fa-pen"></i>
                        </Button>
                    </Tooltip>
                    <Tooltip title="Xoá">
                        <Button isIconOnly variant="light" radius="full" size="sm">
                            <i className="fa-solid fa-trash-can"></i>
                        </Button>
                    </Tooltip>
                </div>
        }
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRow(selectedRows);
            setSelectedRowKeys(selectedRowKeys);
        }
    };

    const handleUnSelect = () => {
        setSelectedRowKeys([]);
        setSelectedRow([]);
    }

    const getValueOfVISelectedRow = () => {

        const selectedRows = newsListData.filter(news => selectedRowKeys.includes(news.key));
        const countVITrue = selectedRows.filter(row => row.status_vi.value).length;
        const checkValueVI = countVITrue === selectedRowKeys.length ? true : false;

        return checkValueVI;
    }

    const getValueOfENSelectedRow = () => {

        const selectedRows = newsListData.filter(news => selectedRowKeys.includes(news.key));
        const countENTrue = selectedRows.filter(row => row.status_en.value).length;
        const checkValueEN = countENTrue === selectedRowKeys.length ? true : false;

        return checkValueEN;
    }

    const handleUpdateStatuses = async (lang) => {

        setSpinning(true);

        const checkValueVI = getValueOfVISelectedRow();
        const checkValueEN = getValueOfENSelectedRow();

        const putData = {
            id_new: selectedRowKeys,
            lang: lang,
            status: lang === "vi" ? !checkValueVI : !checkValueEN
        }

        const response = await UpdateStatuses(putData);

        await getNews();

        successNoti("Cập nhật thành công");
        setSpinning(false);

    }

    const getCategory = async () => {
        try {
            const response = await GetAllCategories();

            const newsCategoryData = response.data.map((news) => {
                return ({
                    value: news.id_category,
                    text: news.name_vi
                })
            })

            // console.log("Category data:", newsCategoryData);
            setCategoryData(newsCategoryData);

        } catch (error) {
            console.error("Error fetching news:", error);
        }
    }

    const getNews = async () => {
        setSpinning(true);
        try {
            const response = await ListNews();

            const updatedNewsData = response.data.map((news) => {
                return {
                    key: news.id_new,
                    thumbnail: news.thumbnail,
                    name_group: {
                        thumbnail: news.thumbnail,
                        title_vi: news.title_vi,
                        title_en: news.title_en,
                    },
                    status_vi: {
                        value: news.status_vi,
                        id: news.id_new
                    },
                    status_en: {
                        value: news.status_en,
                        id: news.id_new
                    },
                    view_count: news.view_count,
                    category: {
                        en: news.category_name_en,
                        vi: news.category_name_vi,
                        id: news.id_category
                    },
                    date: {
                        created_at: moment(news.created_at).format('DD/MM/YYYY HH:mm'),
                        updated_at: moment(news.updated_at).format('DD/MM/YYYY HH:mm')
                    },
                    action: news.id_new
                };
            });

            setNewsListData(updatedNewsData);

            setSpinning(false);
        } catch (error) {
            console.error("Error fetching news:", error);
            setSpinning(false);
        }
    };

    useEffect(() => {
        getNews();
        getCategory();
        handleGetCurrentUser();
    }, []);
    
    const handleGetCurrentUser = async () => {
        const user_info = await getCurrentUser();
        console.log(user_info);
    }

    const handleUpdateStatus_vi = async (id) => {
        setSpinning(true);
        try {
            const response = await UpdateStatusVi(id);
            await getNews();
            setSpinning(false);
            successNoti("Cập nhật thành công");
        } catch (error) {
            console.error("error update: ", error);
            setSpinning(false);
            errorNoti("Cập nhật thất bại");
        }
    };

    const handleUpdateStatus_en = async (id) => {
        setSpinning(true);
        try {
            const response = await UpdateStatusEn(id);
            await getNews();
            setSpinning(false);
            successNoti("Cập nhật thành công");
        } catch (error) {
            console.error("error update: ", error);
            setSpinning(false);
            errorNoti("Cập nhật thất bại");
        }
    };

    return (
        <div className="HomeAdmin flex flex-col gap-5 items-start">
            <Spin spinning={spinning} fullscreen />
            <Breadcrumbs underline="hover">
                <BreadcrumbItem>Admin Dashboard</BreadcrumbItem>
                <BreadcrumbItem>Quản lý bài viết</BreadcrumbItem>
            </Breadcrumbs>
            <Button color="primary" radius="sm" as={Link} to="/admin/post/create">Tạo bài viết</Button>
            {
                selectedRowKeys.length !== 0 &&
                <div className="Quick__Option flex justify-between items-center sticky top-2 bg-[white] z-50 w-full p-4 py-3 shadow-lg rounded-md border-1 border-slate-300">
                    <p className="text-sm font-medium"><i className="fa-solid fa-circle-check mr-3 text-emerald-500"></i> Đã chọn {selectedRow.length} bài viết</p>
                    <div className="flex items-center gap-2">
                        <Tooltip title={`${getValueOfVISelectedRow() ? "Ẩn" : "Hiện"} ${selectedRowKeys.length} bài viết`} getPopupContainer={() => document.querySelector('.Quick__Option')}>
                            <Switch
                                size="sm"
                                className="scale-80"
                                isSelected={getValueOfVISelectedRow()}
                                classNames={{
                                    base: "flex-row-reverse gap-2",
                                    wrapper: "mr-0"
                                }}
                                onClick={() => { handleUpdateStatuses("vi") }}
                            >
                                <Avatar alt="Việt Nam" className="w-6 h-6" src="https://flagcdn.com/vn.svg" />
                            </Switch>
                        </Tooltip>
                        <Tooltip title={`${getValueOfENSelectedRow() ? "Ẩn" : "Hiện"} ${selectedRowKeys.length} bài viết`} getPopupContainer={() => document.querySelector('.Quick__Option')}>
                            <Switch
                                size="sm"
                                className="scale-80"
                                isSelected={getValueOfENSelectedRow()}
                                classNames={{
                                    base: "flex-row-reverse gap-2",
                                    wrapper: "mr-0"
                                }}
                                onClick={() => { handleUpdateStatuses("en") }}
                            >
                                <Avatar alt="English" className="w-6 h-6" src="https://flagcdn.com/gb.svg" />
                            </Switch>
                        </Tooltip>
                        <Tooltip title={`Xoá ${selectedRowKeys.length} bài viết`} getPopupContainer={() => document.querySelector('.Quick__Option')}>
                            <Button isIconOnly variant="light" radius="full">
                                <i className="fa-solid fa-trash-can"></i>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Bỏ chọn" getPopupContainer={() => document.querySelector('.Quick__Option')}>
                            <Button isIconOnly variant="light" radius="full" onClick={() => { handleUnSelect() }}>
                                <i className="fa-solid fa-xmark text-[18px]"></i>
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            }
            <div className="ListNews w-full">
                <Table
                    bordered
                    loading={loading}
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={newsListData}
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default Post;
