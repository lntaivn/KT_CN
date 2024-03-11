import React, { useEffect, useState } from "react";
import { GetNewViEn } from "../../../../service/ApiService";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import "./Home.css"

import { Tooltip, Spinner, Image } from "@nextui-org/react";
import { formatDateTime, formatTimeAgo } from "../../../../service/DateService";
import i18next from "i18next";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

import home_cover from "../../../../assets/home_cover.jpg"

import { Carousel } from 'antd';

const Home = () => {

    const { t } = useTranslation();

    const [newsData, setNewsData] = useState([]); // State to store news data
    const [newsDataFitlered, setNewsDataFiltered] = useState([]); // State to store news data
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);

    const [loading, setLoading] = useState(false);

    const getNews = async () => {
        setLoading(true);
        try {
            const response = await GetNewViEn(i18next.language);
            setNewsData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching news:", error);
            setLoading(false);
        }
    };

    const changePostByLang = () => {
        const filterNewsData = newsData.filter((news) => {
            if (i18next.language === "vi" && news.status_vi === 1) {
                return news;
            } else if (i18next.language === "en" && news.status_en === 1) {
                return news;
            }
        })

        setNewsDataFiltered(filterNewsData);
    }

    useEffect(() => {
        changePostByLang();
    }, [newsData, i18next.language]);

    useEffect(() => {
        getNews();
    }, []);

    const onShowSizeChange = (current, size) => {
        setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi kích thước trang
        setPageSize(size);
    };

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="Home">
            {/* <div className="flex justify-center items-center overflow-hidden w-full h-[500px] relative">
                <img src={home_cover} alt="" className="object-cover w-full h-full" />
                <div className="bg-blue-950 opacity-70 absolute inset-0 w-full h-full"></div>
                <div className="absolute inset-0 w-full h-full font-extrabold text-[white] text-[50px] uppercase">
                    {t("menu.SET_name")}
                </div>
            </div> */}
            <Carousel autoplay>
                <div className="flex justify-center items-center overflow-hidden w-full h-[500px] relative">
                    <img src={home_cover} alt="" className="object-cover w-full h-full" />
                </div>
                <div className="flex justify-center items-center overflow-hidden w-full h-[500px] relative">
                    <img src={home_cover} alt="" className="object-cover w-full h-full" />
                </div>
                <div className="flex justify-center items-center overflow-hidden w-full h-[500px] relative">
                    <img src={home_cover} alt="" className="object-cover w-full h-full" />
                </div>
            </Carousel>
            <div className="p-2 sm:px-5 md:p-10 lg:px-20 flex flex-col gap-10">
                {/* Tin tức */}
                <div className="News w-full flex flex-col">
                    <div className="flex p-4 justify-between items-center">
                        <p className="font-semibold text-[18px]"><i className="fa-solid fa-newspaper mr-3 text-orange-500"></i>{t("News.text_new_1")}</p>
                        <Link to="/news" className="opacity-70 text-[16px]">{t("News.text_new_2")}<i className="fa-solid fa-arrow-right-long ml-2"></i></Link>
                    </div>
                    <div className="grid gap-2 w-full grid-cols-1 md:grid-cols-2">
                        {newsDataFitlered.length === 0 ? <Spinner size="md" /> :
                            newsDataFitlered.map(news => (
                                <Link key={news.id_new} className="w-full flex gap-4 group/news p-4 hover:bg-gray-100" to={`/news-detail/${news.id_new}`}>
                                    <Image
                                        loading="lazy"
                                        src={news.thumbnail}
                                        classNames={{
                                            wrapper: "w-[40%] sm:w-[25%]",
                                            img: "aspect-[4/3] w-full"
                                        }}
                                        radius="none"
                                    />
                                    <div className="flex flex-col flex-1 gap-2">
                                        <h2 className="font-medium text-justify">{i18next.language === "vi" ? news.title_vi : news.title_en}</h2>
                                        <div className="flex items-center gap-5 text-gray-400 text-[14px]">
                                            <Tooltip content={formatDateTime(news.created_at, i18next.language)} radius="sm" color="primary" showArrow>
                                                <p><i className="fa-regular fa-clock mr-2"></i>{formatTimeAgo(news.created_at, i18next.language)}</p>
                                            </Tooltip>
                                            <Tooltip content={i18next.language === "vi" ? "Lượt xem" : "View"} radius="sm" color="primary" showArrow>
                                                <p><i className="fa-regular fa-eye mr-2"></i>{news.view_count}</p>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>

                {/* Sự kiện */}
                <div className="News w-full flex flex-col">
                    <div className="flex p-4 justify-between items-center">
                        <p className="font-semibold text-[18px]"><i className="fa-solid fa-puzzle-piece mr-3 text-orange-500"></i>{t("News.text_new_3")}</p>
                        <Link to="/news" className="opacity-70 text-[16px]">{t("News.text_new_2")}<i className="fa-solid fa-arrow-right-long ml-2"></i></Link>
                    </div>
                    <div className="grid gap-2 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                        {newsDataFitlered.length === 0 ? <Spinner size="md" /> :
                            newsDataFitlered.map(news => (

                                <Link key={news.id_new} className="w-full flex flex-col gap-3 group/news p-4 hover:bg-gray-100" to={`/news-detail/${news.id_new}`}>
                                    <Image
                                        loading="lazy"
                                        src={news.thumbnail}
                                        classNames={{
                                            img: "aspect-[4/3] w-full"
                                        }}
                                        radius="none"
                                    />
                                    <h2 className="font-medium text-justify">{i18next.language === "vi" ? news.title_vi : news.title_en}</h2>
                                    <div className="flex items-center gap-5 text-gray-400">
                                        <Tooltip content={formatDateTime(news.created_at, i18next.language)} radius="sm" color="primary" showArrow>
                                            <p><i className="fa-regular fa-clock mr-2"></i>{formatTimeAgo(news.created_at, i18next.language)}</p>
                                        </Tooltip>
                                        <Tooltip content={i18next.language === "vi" ? "Lượt xem" : "View"} radius="sm" color="primary" showArrow>
                                            <p><i className="fa-regular fa-eye mr-2"></i>{news.view_count}</p>
                                        </Tooltip>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <div className="flex flex-col items-center m-auto">
                        <span className="font-extrabold text-orange-500 text-lg">ĐỐI TÁC</span>
                        <p className="font-semibold text-lg">CỦA CHÚNG TÔI</p>
                    </div>
                    <div className="flex gap-20 m-auto">
                        <div className="flex items-center justify-center">
                            <img src="https://firebasestorage.googleapis.com/v0/b/ktcn-set-tvu.appspot.com/o/hNz8_FPT.png?alt=media&token=20c2464d-6012-4042-b21d-063255918d19" width={118} alt="" className="object-cover" />
                        </div>
                        <div className="flex items-center justify-center">
                            <img src="https://firebasestorage.googleapis.com/v0/b/ktcn-set-tvu.appspot.com/o/Hatk_Phuongnam.jpg?alt=media&token=217a6816-a83d-4a67-b102-018141c2f8d9" width={125} alt="" className="object-cover" />
                        </div>
                        <div className="flex items-center justify-center">
                            <img src="https://firebasestorage.googleapis.com/v0/b/ktcn-set-tvu.appspot.com/o/3iL3_ACI.jpg?alt=media&token=8b27198f-fe8c-4267-8623-697eeec60ce9" width={150} alt="" className="object-cover" />
                        </div>
                        <div className="flex items-center justify-center">
                            <img src="https://ktcn.tvu.edu.vn/ht96_image/lkweb/YPq9_Mylang.png" width={150} alt="" className="object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
