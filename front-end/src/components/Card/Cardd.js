import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { GetAllUser } from "../../service/ApiService";
import { Link } from "react-router-dom";

const Cardd = () => {
    const [userData, setUserData] = useState([]);

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

    const cardList = userData.map((user) => (
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

    return <div>{cardList}</div>;
};

export default Cardd;
