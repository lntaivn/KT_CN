import React, { useEffect, useState } from "react";
import { ListNews, UpdateStatusVi, UpdateStatusEn } from "../../../../service/ApiService";
import { useTranslation } from "react-i18next";
import { Button } from "antd";

import { Link } from "react-router-dom";
import "./Post.css";
import i18next from "i18next";
import { Divider, Radio, Table, Switch, Tooltip } from 'antd';
import { Avatar, Image } from "@nextui-org/react";

const Post = () => {
    const [newsListData, setNewsListData] = useState([]);
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
            title: 'Tiêu đề',
            dataIndex: 'name_group',
            render: (record) =>
                <div className="text-sm">
                    <p className="font-medium">{record.title_vi}</p>
                    <p className="text-[12px] opacity-70">{record.title_en}</p>
                </div>
        },
        {
            title: 'Thể loại',
            dataIndex: 'category',
            render: (record) =>
                <div className="text-sm">
                    <p className="font-medium">{record.vi}</p>
                    <p className="text-[12px] opacity-70">{record.en}</p>
                </div>
        },
        {
            title: 'Lượt xem',
            dataIndex: 'view_count',
            width: "120px"
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
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    const getNews = async () => {
        try {
            const response = await ListNews();

            const newsData = response.data.map((news) => {
                return ({
                    id: news.id_new,
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
                        vi: news.category_name_vi
                    }
                })
            })

            console.log("News data:", response.data);

            setNewsListData(newsData);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    useEffect(() => {
        getNews();
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
            <div className="ListNews">
                <Table
                    bordered
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
