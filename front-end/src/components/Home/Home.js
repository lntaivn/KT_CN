import React, { useEffect, useState } from "react";
import { Card, Pagination } from "antd";
import { GetAllUser } from "../../service/ApiService";
import { Link } from "react-router-dom";

const Home = () => {
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);

    const getUser = async () => {
        try {
            const response = await GetAllUser();
            console.log(response.data);
            setUserData(response.data);
        } catch (error) {
            console.error(error);
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
        <Link key={user.id} to={`/detailnew/${user.id}`}>
            <Card
                key={user.id}
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
                <p>ID: {user.id}</p>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
            </Card>
        </Link>
    ));

    return (
        <div>
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
