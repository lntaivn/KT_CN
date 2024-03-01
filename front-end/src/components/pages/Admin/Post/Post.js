import React, { useEffect, useState } from "react";
import { ListNews, UpdateStatusVi, UpdateStatusEn } from "../../../../service/ApiService";
import { useTranslation } from "react-i18next";
import { Button } from "antd";

import { Link } from "react-router-dom";
import "./Post.css";
import i18next from "i18next";
import { Switch } from "antd";

const Post = () => {
    const [newsListData, setNewsListData] = useState([]);
    const { t } = useTranslation();
    
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
                <h1>{t("Danh sách bài báo")}</h1>
                {newsListData.map((news) => (
                    <div key={news.id_new}>
                        <div>
                            {/* <img src={news.thumbnail} alt="Thumbnail" /> */}

                            <Link to={`/admin/update/news/${news.id_new}`}>
                                {news.title_vi ? news.title_vi : news.title_en}
                            </Link>
                            <Switch
                                defaultChecked={news.status_vi}
                                onClick={() => handleUpdateStatus_vi(news.id_new)}
                            ></Switch>
                            <Switch
                                defaultChecked={news.status_en}
                                onClick={() => handleUpdateStatus_en(news.id_new)}
                            ></Switch>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Post;
