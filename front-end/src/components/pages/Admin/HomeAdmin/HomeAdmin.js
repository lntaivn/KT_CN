import React, { useEffect, useState } from "react";
import { ListNews } from "../../../../service/ApiService";
import { useTranslation } from "react-i18next";
import { Button, Switch } from 'antd';
import { Link } from "react-router-dom";
import "./HomeAdmin.css";
import i18next from "i18next";

const HomeAdmin = () => {
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
        
    const handleSwitchChange = async (newsId, newStatus) => {
      console.log(newsId,"status",newStatus);
    };

    useEffect(() => {
        getNews();
    }, []);

    return (
        <div className="HomeAdmin">
            <div className="ListNews">
                <h1>{t("Danh sách bài báo")}</h1>
                {newsListData.map((news) => (
                    <div key={news.id_new}>
                        <div>
                            <img src={news.thumbnail} alt="Thumbnail" />
                            <Link to={`/admin/update/news/${news.id_new}`}>{news.title_vi ? news.title_vi : news.title_en}</Link>       
                            <Switch checked={news.status_vi === 1} onChange={(checked) => handleSwitchChange(news.id_new, checked)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeAdmin;
