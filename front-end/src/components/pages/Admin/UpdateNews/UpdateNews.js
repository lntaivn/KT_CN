import React, { useEffect, useState } from "react";

import { GetNewCanUpdate } from "../../../../service/ApiService";
import { useTranslation } from "react-i18next";
import { Button } from 'antd';

import { Link, useParams } from "react-router-dom";
import "./UpdateNews.css";
import i18next from "i18next";

const UpdateNews = () => {
    const { id } = useParams();

    const [newsDetailData, setNewsDetailData] = useState([]);

    const getDetailNews = async () => {

        try {
            const response = await GetNewCanUpdate(id);
            console.log("newsDetailData:", response.data);
            setNewsDetailData(response.data);

        } catch (error) {
            console.error("Error fetching newsDetailData:", error);
        }
    };
    useEffect(() => {
        getDetailNews()
    }, []);
    return (
        <div className="HomeAdmin">
            
        </div>
    );
};

export default UpdateNews;
