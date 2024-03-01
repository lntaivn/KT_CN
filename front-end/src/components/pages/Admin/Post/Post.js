import "./Post.css";
import { useEffect, useState } from "react";
import { ListNews, UpdateStatusVi, UpdateStatusEn, GetAllCategories } from "../../../../service/ApiService";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import i18next from "i18next";
import moment from 'moment';
import { Table, Switch, Tooltip } from 'antd';
import { Avatar, BreadcrumbItem, Breadcrumbs, Button, Image } from "@nextui-org/react";

const Post = () => {

    const [newsListData, setNewsListData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation();

    const columns = [
        {
            title: 'Ảnh bìa',
            dataIndex: 'thumbnail',
            render: (text) =>
                <Image
                    loading="lazy"
                    width={100}
                    src={text}
                    classNames={{
                        img: "rounded",
                    }}
                    radius="none"
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
            title: 'Thể loại',
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
            title: 'Thời gian',
            dataIndex: 'date',
            width: "150px",
            render: (record) =>
                <div className="text-[12px]">
                    <span className="opacity-70">Ngày tạo:</span>
                    <p className="font-medium text-[13px] mb-2">{record.created_at}</p>
                    <span className="opacity-70">Ngày cập nhật:</span>
                    <p className="font-medium text-[13px]">{record.updated_at}</p>
                </div>
        },
        {
            title: 'Lượt xem',
            dataIndex: 'view_count',
        },
        {
            title:
                <Tooltip title="Trạng thái">
                    <Avatar alt="Việt Nam" className="w-5 h-5" src="https://flagcdn.com/vn.svg" />
                </Tooltip>,
            dataIndex: 'status_vi',
            render: (record) =>
                <Switch
                    size="small"
                    defaultChecked={record.value}
                    onClick={() => handleUpdateStatus_vi(record.id)}
                ></Switch>,
        },
        {
            title:
                <Tooltip title="Trạng thái">
                    <Avatar alt="Việt Nam" className="w-5 h-5" src="https://flagcdn.com/gb.svg" />
                </Tooltip>,
            dataIndex: 'status_en',
            render: (record) =>
                <Switch
                    size="small"
                    defaultChecked={record.value}
                    onClick={() => handleUpdateStatus_en(record.id)}
                ></Switch>,
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
    };

    const getCategory = async () => {
        try {
            const response = await GetAllCategories();

            const newsCategoryData = response.data.map((news) => {
                return ({
                    value: news.id_category,
                    text: news.name_vi
                })
            })

            console.log("Category data:", newsCategoryData);
            setCategoryData(newsCategoryData);

        } catch (error) {
            console.error("Error fetching news:", error);
        }
    }

    const getNews = async () => {
        setLoading(true);
        try {
            const response = await ListNews();

            const newsData = response.data.map((news) => {
                return ({
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
                    }
                })
            })

            console.log("News data:", response.data);

            setNewsListData(newsData);

            setLoading(false);

        } catch (error) {
            console.error("Error fetching news:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getNews();
        getCategory();
    }, []);

    const handleUpdateStatus_vi = async (id) => {
        try {
            const response = await UpdateStatusVi(id);
            console.log(response.data);
        } catch (error) {
            console.error("error update: ", error);
        }
    };

    const handleUpdateStatus_en = async (id) => {
        try {
            const response = await UpdateStatusEn(id);
            console.log(response.data);
        } catch (error) {
            console.error("error update: ", error);
        }
    };

    return (
        <div className="HomeAdmin">
            <Breadcrumbs underline="hover">
                <BreadcrumbItem>Admin Dashboard</BreadcrumbItem>
                <BreadcrumbItem>Quản lý bài viết</BreadcrumbItem>
            </Breadcrumbs>
            <Button color="primary" radius="sm" as={Link} to="/admin/post/create">Tạo bài viết</Button>
            <div className="ListNews">
                <Table
                    bordered
                    loading={loading}
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={newsListData}
                />
            </div>
        </div>
    );
};

export default Post;
