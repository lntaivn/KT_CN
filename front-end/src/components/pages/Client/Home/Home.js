import React, { useEffect, useState } from "react";
import { GetNewViEn } from "../../../../service/ApiService";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import "./Home.css"

import { Tooltip, Spinner, Image } from "@nextui-org/react";
import { formatDateTime, formatTimeAgo } from "../../../../service/DateService";
import i18next from "i18next";

const Home = () => {

    const { t } = useTranslation();

    const [newsData, setNewsData] = useState([]); // State to store news data
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);

    const [loading, setLoading] = useState(false);

    const getNews = async () => {
        setLoading(true);
        try {
            const response = await GetNewViEn(i18next.language);
            console.log("News data:", response.data);
            setNewsData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching news:", error);
            setLoading(false);
        }
    };

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
        <div className="Home p-5">
            <div className="Home_link_ret">
                <Link to="https://ret.tvu.edu.vn/">
                    <img
                        alt="example"
                        src="https://ktcn.tvu.edu.vn/ht96_image/thongbao/call_for_papers.jpg"
                    />
                </Link>
            </div>
            <div className="About_Khoa">
                <div>
                    <h1>{t("about.text_about_1")}</h1>
                    <h3>{t("about.text_about_2")}</h3>
                    <p className="text-justify">{t("about.text_about_summary")}</p>
                    <Link to="/About">{t("about.Button")}</Link>
                </div>
            </div>
            <div className="Admissions">
                <div>
                    <h1>{t("admissions.title")}</h1>
                </div>
                <div className="Admissions_type">
                    <div>
                        <div className="Admissions_type_img">
                            <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="Admissions Image 1" />
                        </div>
                        <p>{t('admissions.type1')}</p>
                    </div>
                    <div>
                        <div className="Admissions_type_img">
                            <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="Admissions Image 2" />
                        </div>
                        <p>{t('admissions.type2')}</p>
                    </div>
                </div>
            </div>
            <div>
                <h1>{t("News.text_new_1")}</h1>
            </div>

            <div className="News w-full">
                <div className="grid gap-2 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                    {newsData.length === 0 ? <Spinner size="md" /> :
                        newsData.map(news => (
                            <Link key={news.id_new} className="w-full flex flex-col gap-3 group/news p-4 hover:bg-gray-100 rounded" to={`/news-detail/${news.id_new}`}>
                                {/* <div className="flex items-center justify-center overflow-hidden rounded">
                                    <img src={news.thumbnail} className="w-full h-full aspect-[4/3] object-cover group-hover/news:scale-105 duration-300" alt="" />
                                </div> */}
                                <Image
                                    loading="lazy"
                                    src={news.thumbnail}
                                    classNames={{
                                        img: "aspect-[4/3] rounded w-full"
                                    }}
                                    radius="none"
                                />
                                <h2 className="font-medium text-justify">{i18next.language === "vi" ? news.title_vi : news.title_en}</h2>
                                <div className="flex items-center gap-5 text-gray-400">
                                    <Tooltip content={formatDateTime(news.updated_at, i18next.language)} radius="sm" color="primary" showArrow>
                                        <p><i className="fa-regular fa-clock mr-2"></i>{formatTimeAgo(news.updated_at, i18next.language)}</p>
                                    </Tooltip>
                                    <Tooltip content={i18next.language === "vi" ? "Lượt xem" : "View"} radius="sm" color="primary" showArrow>
                                        <p><i className="fa-regular fa-eye mr-2"></i>{news.view_count}</p>
                                    </Tooltip>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>

            <div>

            </div>
            {/* {cardList}
            <Pagination
                // showSizeChanger
                onShowSizeChange={onShowSizeChange}
                onChange={onPageChange}
                defaultCurrent={1}
                total={newsData.length}
                pageSize={pageSize}
            /> */}
        </div>
    );
};

export default Home;
