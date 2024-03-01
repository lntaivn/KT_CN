import React, { useEffect, useState } from "react";

import { ListNews, UpdateStatusVi } from "../../../../service/ApiService";
import { useTranslation } from "react-i18next";
import { Button } from "antd";

import { Link } from "react-router-dom";
import "./HomeAdmin.css";
import i18next from "i18next";
import { Switch } from "antd";

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

    useEffect(() => {
        getNews();
    }, []);

    const handleUpdateStatus = async (id) => {
        try {
            const response = await UpdateStatusVi(id);
            console.log(response.data);
        } catch (error) {
            console.error("error update: ", error);
        }
    };

    return (
        <div className="HomeAdmin">
            <div className="ListNews">
                <h1>Danh sách bài báo</h1>
                {newsListData.map((news) => (
                    <div key={news.id_new}>
                        <div>
                            <img src={news.thumbnail} alt="Thumbnail" />

                            <Link to={`/admin/update/news/${news.id_new}`}>
                                {news.title_vi ? news.title_vi : news.title_en}
                            </Link>
                            <Switch
                                defaultChecked={news.status_vi}
                                onClick={() => handleUpdateStatus(news.id_new)}
                            ></Switch>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeAdmin;
