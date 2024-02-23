import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { GetUserById } from "../../service/ApiService";
import { useParams } from "react-router-dom";

const DetailNews = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    console.log("id: ", id);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetUserById(id);
                setUser(response.data);
                console.log("user:", user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, [id]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
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
            <p>IDId: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </Card>
    );
};

export default DetailNews;
