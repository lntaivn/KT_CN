import React, { useEffect, useState } from "react";
import { GetNewViEnById, get5LatestNews, getTop5ViewCount, getTop5RelatedCategory } from "../../../../service/ApiService";
import { useTranslation } from "react-i18next";

import { Link, useParams } from "react-router-dom";
import "./NewsDetail.css"
import i18next from "i18next";

const NewsDetail = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    
    const [newsDetailData, setNewsDetailData] = useState([]);
    const [latestNews, setLatestNews] = useState([]);
    const [topViewCountNews, setTopViewCountNews] = useState([]);
    const [relativeCategoryNews, setRelativeCategoryNews] = useState([]);

    const getDetailNews = async () => {
        try {
            const response = await GetNewViEnById(i18next.language, id);
            console.log("newsDetailData:", response.data);
            setNewsDetailData(response.data);

        } catch (error) {
            console.error("Error fetching newsDetailData:", error);
        }
    };

    const getRelativeCategoryNews = async () => {
        try {
            // note: data id_category
                const response = await getTop5RelatedCategory(i18next.language, id);
                console.log("relativeCategoryNews:", response.data);
                setRelativeCategoryNews(response.data);
        } catch (error) {
            console.error("Error fetching relativeCategoryNews:", error);
        }
    };

    const getLatestNews = async () => {
        try {
            const response = await get5LatestNews(i18next.language);
           console.log("latestNews:", response.data);
            setLatestNews(response.data);
        } catch (error) {
            console.error("Error fetching latestNews:", error);
        }
    };

    const getTopViewCountNews = async () => {
        try {
            const response = await getTop5ViewCount(i18next.language);
            //console.log("topViewCountNews:", response.data);
            setTopViewCountNews(response.data);
        } catch (error) {
            console.error("Error fetching topViewCountNews:", error);
        }
    };

    useEffect(() => {
        console.log("dcc: ", i18next.language);
        getDetailNews();
        getLatestNews();
        getTopViewCountNews();
        getRelativeCategoryNews();
    }, [i18next.language]);

    return (
        <div className="newsDetail">
            <div className="newsDetail_left">
            {newsDetailData.map((news) => (
                <div key={news.id_new}>
                    <h2 className="newsDetail_left_title">
                        {news.title}
                    </h2>
                    <div>{news.updated_at}</div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: news.content,
                        }}
                    ></div>
                </div>
            ))}
            </div>

            <div className="newsDetail_right">
                <div className="New_Relative">
                    <div className="New_Relative_tital">
                        <h2> {t('NewsDetail.related')}</h2>
                    </div>
                    <div className="New_Relative_top5">
                        {relativeCategoryNews.map((news) => (
                            <Link to={`../news-detail/${news.id_new}`} key={news.id_new}>{news.title}</Link>
                        ))}
                    </div>
                </div>


                <div className="New_Latest">
                    <div className="New_Relative_tital">
                        <h2>{t('NewsDetail.latest')}</h2>
                    </div>
                    <div className="New_latest_stories_top5">
                        {latestNews.map((news) => (
                            <div>
                                <Link to={`../news-detail/${news.id_new}`} key={news.id_new}>{news.title}</Link>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="New_Latest">
                    <div className="New_Relative_tital">
                        <h2>{t('NewsDetail.popular')}</h2>
                    </div>
                    <div className="New_latest_stories_top5">
                        {topViewCountNews.map((news) => (
                            <div>
                                <Link to={`../news-detail/${news.id_new}`} key={news.id_new}>{news.title}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsDetail;
