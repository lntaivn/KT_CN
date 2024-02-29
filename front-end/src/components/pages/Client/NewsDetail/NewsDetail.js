import React, { useEffect, useState } from "react";
import { GetNewViEnById, get5LatestNews, getTop5ViewCount, getTop5RelatedCategory } from "../../../../service/ApiService";
import { useTranslation } from "react-i18next";

import { Link, useParams } from "react-router-dom";
import "./NewsDetail.css"
import i18next from "i18next";
import { formatDateTime, formatTimeAgo } from "../../../../service/DateService";
import { Image, Tooltip } from "@nextui-org/react";

const NewsDetail = () => {
    const { t } = useTranslation();
    const { id } = useParams();

    const [newsDetailData, setNewsDetailData] = useState({});
    const [latestNews, setLatestNews] = useState([]);
    const [topViewCountNews, setTopViewCountNews] = useState([]);
    const [relativeCategoryNews, setRelativeCategoryNews] = useState([]);

    const getDetailNews = async () => {
        try {
            const response = await GetNewViEnById(i18next.language, id);
            console.log("newsDetailData:", response.data);
            setNewsDetailData(response.data[0]);

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
    }, [id, i18next.language]);

    return (
        <div className="newsDetail flex flex-col lg:flex-row px-[20px] py-[20px] gap-[30px] sm:p-[30px] xl:px-[70px] xl:gap-[50px]">
            <div className="newsDetail_left flex-1">
                <div>
                    <Tooltip content={formatDateTime(newsDetailData?.created_at, i18next.language)} radius="sm" color="primary" showArrow placement="right">
                        <p className="w-fit text-gray-500 mb-2"><i className="fa-regular fa-clock mr-2"></i>{formatTimeAgo(newsDetailData?.created_at, i18next.language)}</p>
                    </Tooltip>
                    <h2 className="newsDetail_left_title font-bold text-2xl mb-5">
                        {newsDetailData?.title}
                    </h2>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: newsDetailData?.content,
                        }}
                    ></div>
                </div>
            </div>

            <div className="newsDetail_right sticky top-[80px] w-[100%] min-w-[300px] lg:max-w-[400px] flex flex-col gap-10">
                <div className="New_Relative w-full">
                    <div className="New_Relative_tital">
                        <h2>{t('NewsDetail.related')}</h2>
                        <p className="text-sm font-normal">{relativeCategoryNews?.length} bài viết</p>
                    </div>
                    <div className="New_Relative_top5 flex flex-col gap-5">
                        {relativeCategoryNews.map((news) => (
                            <Link to={`../news-detail/${news.id_new}`} key={news.id_new} className="flex gap-3">
                                <Image
                                    src={news.thumbnail}
                                    classNames={{
                                        img: "aspect-[4/3] w-[130px] rounded"
                                    }}
                                    radius="none"
                                />
                                <p className="flex-1 text-[14px] font-medium">{news.title}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="New_Latest w-full">
                    <div className="New_Relative_tital">
                        <h2>{t('NewsDetail.latest')}</h2>
                        <p className="text-sm font-normal">{latestNews?.length} bài viết</p>
                    </div>
                    <div className="New_latest_stories_top5 flex flex-col gap-5">
                        {latestNews.map((news) => (
                            <Link to={`../news-detail/${news.id_new}`} key={news.id_new} className="flex gap-3">
                                <Image
                                    src={news.thumbnail}
                                    classNames={{
                                        img: "aspect-[4/3] w-[130px] rounded"
                                    }}
                                    radius="none"
                                />
                                <p className="flex-1 text-[14px] font-medium">{news.title}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="New_Latest w-full">
                    <div className="New_Relative_tital">
                        <h2>{t('NewsDetail.popular')}</h2>
                        <p className="text-sm font-normal">{topViewCountNews?.length} bài viết</p>
                    </div>
                    <div className="New_latest_stories_top5 flex flex-col gap-5">
                        {topViewCountNews.map((news) => (
                            <Link to={`../news-detail/${news.id_new}`} key={news.id_new} className="flex gap-3">
                                <Image
                                    src={news.thumbnail}
                                    classNames={{
                                        img: "aspect-[4/3] w-[130px] rounded"
                                    }}
                                    radius="none"
                                />
                                <p className="flex-1 text-[14px] font-medium">{news.title}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsDetail;
