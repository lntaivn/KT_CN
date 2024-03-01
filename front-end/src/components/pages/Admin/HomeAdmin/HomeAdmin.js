import React, { useEffect, useState } from "react";

import { ListNews } from "../../../../service/ApiService";
import { useTranslation } from "react-i18next";
import { Button, Switch } from 'antd';

import { Link } from "react-router-dom";
import "./HomeAdmin.css";
import i18next from "i18next";

const HomeAdmin = () => {
    const [newsListData, setNewsListData] = useState([]);

    const getNews = async () => {
        try {
            const response = await ListNews();
            console.log("News data:", response.data);
            setNewsListData(response.data);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };
    // Tạo một mảng state để lưu trạng thái của mỗi Switch
    const [switchStates, setSwitchStates] = useState({});

    // Hàm để xử lý sự kiện khi người dùng thay đổi trạng thái của Switch
    const handleToggle = (checked, newsId) => {
        // Cập nhật trạng thái của Switch tương ứng với newsId
        setSwitchStates({ ...switchStates, [newsId]: checked });
        console.log("Switch", switchStates);
    };

    useEffect(() => {
        getNews();
    }, []);

    return (
        <div className="HomeAdmin">
            <div className="ListNews">
                <h1>Danh sách bài báo</h1>
                {newsListData.map((news) => (
                    <div key={news.id_new}>
                        <div>
                            <img src={news.thumbnail} alt="Thumbnail" />
                         
                            <Link to={`/admin/update/news/${news.id_new}`}>{news.title_vi ? news.title_vi : news.title_en}</Link>
                            <Switch 
                                checked={switchStates[news.id_new]} 
                                onChange={(checked) => handleToggle(checked, news.id_new)} 
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeAdmin;
