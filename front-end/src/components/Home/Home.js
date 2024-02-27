import React, { useEffect, useState } from "react";
import { Card, Pagination } from "antd";
import { GetAllUser } from "../../service/ApiService";
import { Link } from "react-router-dom";
import "./Home.css"
const Home = () => {
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
                        GIỚI THIỆU KHOA

                    </h1>
                    <h3>KHOA KỸ THUẬT VÀ CÔNG NGHỆ, THÀNH TỰU VÀ PHÁT TRIỂN</h3>
                    <p>
                        Với sự phát triển của kỹ thuật hiện đại, Kỹ thụât và Công nghệ đóng một vai trò rất quan trọng
                        trong phát triển công nghiệp, Khoa Kỹ thuật và Công nghệ (KT&CN) được thành lập theo quyết định số: 179/QĐ-ĐHTV ngày 20/10/2006 của Hiệu trưởng trường Đại học Trà Vinh với 5 đơn vị: Bộ môn Công nghệ Thông tin, bộ môn Điện - Điện tử, bộ môn Cơ khí - Động lực, bộ môn Xây dựng và Văn phòng Khoa. Hiện tại, đội ngũ của Khoa có 80 viên chức, tất cả họ đều trẻ, năng động và ham học hỏi. Vì thế, Khoa tạo nhiều cơ hội để họ được bồi dưỡng và nâng cao nghề nghiệp. Hằng năm, Khoa tuyển mới trên 500 sinh viên. Đặc biệt, số lượng sinh viên tìm được việc làm sau 1 năm tốt nghiệp là trên 90%.
                    </p>
               
                    <Link to="/gioi-thieu/gioi-thieu-khoa">Xem thêm</Link>
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
