import React, { useEffect, useState } from "react";
import { Card, Pagination } from "antd";
import { GetNewViEn } from "../../../../service/ApiService";
import { useTranslation } from 'react-i18next';

import { Link } from "react-router-dom";
import "./Home.css"
import i18next from "i18next";
const Home = () => {
    const { t } = useTranslation();

    const [newsData, setNewsData] = useState([]); // State to store news data
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);

    const getNews = async () => {
        try {
            const response = await GetNewViEn(i18next.language);
            console.log("News data:", response.data);
            setNewsData(response.data); // Set dữ liệu tin tức vào state
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    useEffect(() => {
        getNews();
    }, [i18next.language]);

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

    const cardList = currentItems.map((news) => (
        <Link key={news.id} to={`/detailnew/${news.id}`}>
            <Card
                key={news.id}
                hoverable
                style={{
                    width: 240,
                    margin: "10px",
                }}
                // cover={
                //     <img
                //         alt="example"
                //         src={news.image_url} // Assuming the API response includes image_url for each news item
                //     />
                // }
            >
                <p>ID: {news.id}</p>
                <p>Title: {news.title}</p>
                <p>Description: {news.content}</p>
            </Card>
        </Link>
    ));

    return (
        <div className="Home">
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
                    <h1>
                        {t('about.text_about_1')}

                    </h1>
                    <h3>{t('about.text_about_2')}</h3>
                    <p>
                        {t('about.text_about_summary')}
                    </p>
                    <Link to="/About">{t('about.Button')}</Link>
                </div>
            </div>
            <div className="Admissions">
                <div>
                    <h1>{t('admissions.title')}</h1>
                </div>
                <div>
                    <div>
                        <div>
                            <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="Admissions Image 1" />
                        </div>
                        <p>{t('admissions.type1')}</p>
                    </div>
                    <div>
                        <div>
                            <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="Admissions Image 2" />
                        </div>
                        <p>{t('admissions.type2')}</p>
                    </div>
                </div>
            </div>
            <div class="News">
                <div class="News_display_grid">
                    <div class="card">Card 1</div>
                    <div class="card">Card 2</div>
                    <div class="card">Card 3</div>
                </div>
            </div>

            <div>

            </div>
            {cardList}
            <Pagination
                // showSizeChanger
                onShowSizeChange={onShowSizeChange}
                onChange={onPageChange}
                defaultCurrent={1}
                total={newsData.length}
                pageSize={pageSize}
            />
        </div>
    );
};

export default Home;
