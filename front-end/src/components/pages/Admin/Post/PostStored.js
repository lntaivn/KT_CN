import "./Post.css";
import { useEffect, useState } from "react";
import {
    UpdateStatusVi,
    UpdateStatusEn,
    GetAllCategories,
    UpdateStatuses,
} from "../../../../service/ApiService";

import { Link } from "react-router-dom";
import moment from "moment";
import { Table, Tooltip, Image } from "antd";
import {
    Avatar,
    BreadcrumbItem,
    Breadcrumbs,
    Button,
    Switch,
    User,
} from "@nextui-org/react";
import { getAllNewsForAdmin } from "../../../../service/NewsService";

const PostStored = (props) => {
    const { successNoti, errorNoti, setSpinning } = props;

    const [newsListData, setNewsListData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedRow, setSelectedRow] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const calculateRemainingTime = (deleteDate) => {
        const deleteMoment = moment(deleteDate);
        const futureDate = deleteMoment.add(30, 'days');
        const remainingMinutes = futureDate.diff(moment(), 'minutes');

        if (remainingMinutes < 60) {
            // Nếu còn dưới 1 giờ, tính số phút còn lại
            return { minutes: Math.max(0, remainingMinutes) };
        } else if (remainingMinutes < 24 * 60) {
            // Nếu còn dưới 1 ngày, tính số giờ còn lại
            const hours = Math.floor(remainingMinutes / 60);
            return { hours };
        } else {
            // Nếu còn trên 1 ngày, tính số ngày còn lại
            const remainingDays = futureDate.diff(moment(), 'days');
            return { days: remainingDays };
        }
    };

    const columns = [
        {
            title: "Ảnh bìa",
            dataIndex: "thumbnail",
            render: (text) => (
                <Image width={100} src={text} className="rounded" />
            ),
        },
        {
            title: "Tiêu đề bài viết",
            dataIndex: "name_group",
            render: (record) => (
                <div className="text-sm">
                    <p className="font-medium">{record.title_vi}</p>
                    <p className="text-[12px] opacity-70 mt-1">
                        {record.title_en}
                    </p>
                </div>
            ),
        },
        {
            title: "Thời gian",
            dataIndex: "date",
            width: "150px",
            render: (record) => (
                <div className="text-[12px] flex flex-col gap-3">
                    <div>
                        <span className="opacity-70">Ngày tạo:</span>
                        <p className="font-medium text-[13px]">
                            {record.created_at}
                        </p>
                        <div className="flex items-center gap-[5px]">
                            <span className="opacity-70">bởi</span>
                            <Tooltip
                                className="bg-[white]"
                                title={
                                    <div className="flex items-center gap-2">
                                        <Avatar
                                            className="w-7 h-7 cursor-pointer"
                                            src={record.create_by.photoURL}
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-[13px] font-semibold">
                                                {record.create_by.name}
                                            </span>
                                            <p className="text-[11px] opacity-70 -mt-1">
                                                {record.create_by.email}
                                            </p>
                                        </div>
                                    </div>
                                }
                            >
                                <Avatar
                                    className="w-5 h-5 cursor-pointer"
                                    src={record.create_by.photoURL}
                                />
                            </Tooltip>
                        </div>
                    </div>
                    <div>
                        <span className="opacity-70">Cập nhật lần cuối:</span>
                        <p className="font-medium text-[13px]">
                            {record.updated_at}
                        </p>
                        <div className="flex items-center gap-[5px]">
                            <span className="opacity-70">bởi</span>
                            <Tooltip
                                className="bg-[white]"
                                title={
                                    <div className="flex items-center gap-2">
                                        <Avatar
                                            className="w-7 h-7 cursor-pointer"
                                            src={record.update_by.photoURL}
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-[13px] font-semibold">
                                                {record.update_by.name}
                                            </span>
                                            <p className="text-[11px] opacity-70 -mt-1">
                                                {record.update_by.email}
                                            </p>
                                        </div>
                                    </div>
                                }
                            >
                                <Avatar
                                    className="w-5 h-5 cursor-pointer"
                                    src={record.update_by.photoURL}
                                />
                            </Tooltip>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: (
                <Tooltip title="Danh mục">
                    <i className="fa-solid fa-icons text-[16px]"></i>
                </Tooltip>
            ),
            dataIndex: "category",
            render: (record) => (
                <div className="text-sm">
                    <p className="font-medium">{record.vi}</p>
                    <p className="text-[12px] opacity-70 mt-1">{record.en}</p>
                </div>
            ),
            filters: categoryData,
            onFilter: (value, record) => record.category.id === value,
        },
        {
            title: (
                <div className="flex items-center justify-center w-full">
                    <Tooltip title="Lượt xem">
                        <i className="fa-solid fa-eye text-[16px]"></i>
                    </Tooltip>
                </div>
            ),
            dataIndex: "view_count",
            render: (record) => (
                <div className="flex items-center justify-center w-full">
                    {record.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </div>
            ),
        },
        {
            title: (
                <div className="flex items-center justify-center w-full">
                    <Tooltip title="Thời gian tự động xoá">
                        <i className="fa-solid fa-hourglass-half text-[15px]"></i>
                    </Tooltip>
                </div>
            ),
            dataIndex: "auto_delete",
            render: (date) => {
                const { days, hours, minutes } = calculateRemainingTime(date);
                if (days) {
                    return <p className="text-[14px]">Tự động xoá sau {days} ngày</p>;
                } else if (hours) {
                    return <p className="text-[14px]">Tự động xoá sau {hours} giờ</p>;
                } else {
                    return <p className="text-[14px]">Tự động xoá sau {minutes} phút</p>;
                }
            },
        },
        {
            title: (
                <div className="flex items-center justify-center w-full">
                    <i className="fa-solid fa-bars text-[18px]"></i>
                </div>
            ),
            dataIndex: "action",
            render: (_id) => (
                <div className="flex flex-col items-center justify-center w-full gap-2">
                    <Tooltip title="Xoá">
                        <Button
                            isIconOnly
                            variant="light"
                            radius="full"
                            color="danger"
                        >
                            <i className="fa-solid fa-trash-can"></i>
                        </Button>
                    </Tooltip>
                </div>
            ),
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRow(selectedRows);
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    const handleUnSelect = () => {
        setSelectedRowKeys([]);
        setSelectedRow([]);
    };

    const getValueOfVISelectedRow = () => {
        const selectedRows = newsListData.filter((news) =>
            selectedRowKeys.includes(news.key)
        );
        const countVITrue = selectedRows.filter(
            (row) => row.status_vi.value
        ).length;
        const checkValueVI =
            countVITrue === selectedRowKeys.length ? true : false;

        return checkValueVI;
    };

    const getValueOfENSelectedRow = () => {
        const selectedRows = newsListData.filter((news) =>
            selectedRowKeys.includes(news.key)
        );
        const countENTrue = selectedRows.filter(
            (row) => row.status_en.value
        ).length;
        const checkValueEN =
            countENTrue === selectedRowKeys.length ? true : false;

        return checkValueEN;
    };

    const handleUpdateStatuses = async (lang) => {
        setSpinning(true);

        const checkValueVI = getValueOfVISelectedRow();
        const checkValueEN = getValueOfENSelectedRow();

        const putData = {
            id_new: selectedRowKeys,
            lang: lang,
            status: lang === "vi" ? !checkValueVI : !checkValueEN
        }
        console.log(putData);
        const response = await UpdateStatuses(putData);

        await getNews();

        successNoti("Cập nhật thành công");
        setSpinning(false);
    };

    const getCategory = async () => {
        try {
            const response = await GetAllCategories();

            const newsCategoryData = response.data.map((news) => {
                return {
                    value: news.id_category,
                    text: news.name_vi,
                };
            });

            // console.log("Category data:", newsCategoryData);
            setCategoryData(newsCategoryData);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    const getNews = async () => {
        setSpinning(true);
        try {
            const response = await getAllNewsForAdmin();

            console.log(response.data)

            const updatedNewsData = response.data.map((news) => {
                return {
                    key: news.id_new,
                    thumbnail: news.thumbnail,
                    name_group: {
                        thumbnail: news.thumbnail,
                        title_vi: news.vi.title_vi,
                        title_en: news.en.title_en,
                    },
                    view_count: news.view_count,
                    category: {
                        en: news.en.category_name_en,
                        vi: news.vi.category_name_vi,
                        id: news.id_category,
                    },
                    date: {
                        created_at: moment(news.created_at).format(
                            "DD/MM/YYYY HH:mm"
                        ),
                        create_by: {
                            email: news.user.email,
                            photoURL: news.user.photoURL,
                            name: news.user.name
                        },
                        updated_at: moment(news.updated_at).format(
                            "DD/MM/YYYY HH:mm"
                        ),
                        update_by: {
                            email: news.user_update.email,
                            photoURL: news.user_update.photoURL,
                            name: news.user_update.name
                        }
                    },
                    action: news.id_new,
                    auto_delete: news.updated_at
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
    }, []);

    return (
        <div className="HomeAdmin flex flex-col gap-5 items-start">
            <div className="flex items-start justify-between w-full">
                <Breadcrumbs underline="hover">
                    <BreadcrumbItem>Admin Dashboard</BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to="/admin/post">Quản lý bài viết</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Bài viết được lưu trữ</BreadcrumbItem>
                </Breadcrumbs>
                <div className="flex gap-2">
                    <Tooltip title="Xoá vĩnh viễn toàn bộ bài viết" placement="left">
                        <Button
                            isIconOnly
                            variant="light"
                            color="danger"
                            radius="full"
                        >
                            <i className="fa-solid fa-broom"></i>
                        </Button>
                    </Tooltip>
                </div>
            </div>
            {selectedRowKeys.length !== 0 && (
                <div className="Quick__Option flex justify-between items-center sticky top-2 bg-[white] z-50 w-full p-4 py-3 shadow-lg rounded-md border-1 border-slate-300">
                    <p className="text-sm font-medium">
                        <i className="fa-solid fa-circle-check mr-3 text-emerald-500"></i>{" "}
                        Đã chọn {selectedRow.length} bài viết
                    </p>
                    <div className="flex items-center gap-2">
                        <Tooltip
                            title={`Khôi phục ${selectedRowKeys.length} bài viết`}
                            getPopupContainer={() =>
                                document.querySelector(".Quick__Option")
                            }
                        >
                            <Button isIconOnly variant="light" radius="full">
                                <i className="fa-solid fa-clock-rotate-left"></i>
                            </Button>
                        </Tooltip>
                        <Tooltip
                            title={`Xoá vĩnh viễn ${selectedRowKeys.length} bài viết`}
                            getPopupContainer={() =>
                                document.querySelector(".Quick__Option")
                            }
                        >
                            <Button isIconOnly variant="light" radius="full">
                                <i className="fa-solid fa-trash-can"></i>
                            </Button>
                        </Tooltip>
                        <Tooltip
                            title="Bỏ chọn"
                            getPopupContainer={() =>
                                document.querySelector(".Quick__Option")
                            }
                        >
                            <Button
                                isIconOnly
                                variant="light"
                                radius="full"
                                onClick={() => {
                                    handleUnSelect();
                                }}
                            >
                                <i className="fa-solid fa-xmark text-[18px]"></i>
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            )}
            <div className="ListNews w-full flex flex-col gap-1">
                <div className="text-[12px] opacity-50">
                    <i className="fa-solid fa-circle-info mr-1"></i>
                    Bài viết được lưu trữ sẽ tự động xoá sau 30 ngày
                </div>
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

export default PostStored;
