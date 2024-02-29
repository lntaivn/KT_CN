import React, { useEffect, useState } from "react";

import { ListNews } from "../../../../service/ApiService";
import { useTranslation } from "react-i18next";

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

    useEffect(() => {
        getNews();
    }, []);

    return (
        <div className="HomeAdmin">
            <div className="ListNews">
                <h1>Danh sách bài báo</h1>
                {newsListData.map((news) => (
                       
                ))}
            </div>
        </div>
    );
};

export default HomeAdmin;
