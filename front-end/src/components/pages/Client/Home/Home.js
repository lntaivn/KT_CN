import React, { useEffect, useState } from "react";
import { Card, Pagination } from "antd";
import { GetAllUser } from "../../../../service/ApiService";
import { useTranslation } from 'react-i18next';

import { Link } from "react-router-dom";
import "./Home.css"
import About from "../About/About";
const Home = () => {
    const { t } = useTranslation();

    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);

    const getUser = async () => {
        try {
            const response = await GetAllUser();
            console.log("Response data:", response.data);
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    useEffect(() => {
        getUser();
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
    const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);

    const cardList = currentItems.map((user) => (
        <Link key={user.id_user} to={`/detailnew/${user.id_user}`}>
            <Card
                key={user.id_user}
                hoverable
                style={{
                    width: 240,
                    margin: "10px",
                }}
                cover={
                    <img
                        alt="example"
                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                    />
                }
            >
                <p>ID: {user.id_user}</p>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
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
            {cardList}
            <Pagination
                // showSizeChanger
                onShowSizeChange={onShowSizeChange}
                onChange={onPageChange}
                defaultCurrent={1}
                total={userData.length}
                pageSize={pageSize}
            />
        </div>
    );
};

export default Home;
