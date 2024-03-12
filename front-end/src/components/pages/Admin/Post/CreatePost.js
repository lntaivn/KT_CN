import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Breadcrumbs, BreadcrumbItem, Button, Avatar, Input} from "@nextui-org/react";
import { Upload, Select, message, Tooltip } from "antd";
import ImgCrop from "antd-img-crop";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { SaveDataNews, SaveDataNewsAdmissions } from "../../../../service/NewsService";
import { getAllCategories } from "../../../../service/CategoryService";
import "./Post.css";
import { Link } from "react-router-dom";

const { Option } = Select;

const CreatePost = (props) => {
    const { setCollapsedNav, stype } = props;

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedDepartments, setSelectedDepartments] = useState("");

    const [CategoryData, setCategoryData] = useState([]);
    const [type_university, setTypeUniversity] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [titleEN, setTitleEN] = useState("");
    const [titleVI, setTitleVI] = useState("");
    const [contentEN, setContentEN] = useState("");
    const [contentVI, setContentVI] = useState("");

    const [layout, setLayout] = useState("col");
    const [disableRowLayout, setDisableRowLayout] = useState(false);

    //hangle database
    const getCategorys = async () => {
        try {
            if(stype === 1) {
                const response = await getAllCategories();
                console.log("News data:", response.data);
                setCategoryData(response.data);
            } else {
                const StringCatagory = [
                    { id: 1, type_university_vi: "Sau đại học", type_university_en: "SporHigher educationts"},
                    { id: 2, type_university_vi: "Đại học", type_university_en: "Undergraduate"},
                ];
                setTypeUniversity(StringCatagory);
                //departmentAll();
            }
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };
    
    const departmentAll = async () =>{
        try {
            const response = await departmentAll();
            console.log("departments data:", response.data);
            setDepartments(response.data);
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };




    const SaveData = () => {
        if(stype === 1) {
            const title_vi = titleVI !== "" ? titleVI : null;
            const title_en = titleEN !== "" ? titleEN : null;
            const data = {
                id_category: selectedCategory,
                title_en: title_en,
                title_vi: title_vi,
                content_en: contentEN,
                content_vi: contentVI,
                thumbnail: imageUrl
            };
        
            SaveDataNews(data)
                .then((response) => {
                    console.log("Phản hồi từ máy chủ:", response);
                })
                .catch((error) => {
                    console.error("Lỗi khi gửi dữ liệu:", error);
                });
        } else { 
            const title_vi = titleVI !== "" ? titleVI : null;
            const title_en = titleEN !== "" ? titleEN : null;
            const university_vi = selectedCategory === 1 ? type_university[0].type_university_vi : type_university[1].type_university_vi;
            const university_en = selectedCategory === 1 ? type_university[0].type_university_en : type_university[1].type_university_en;
            console.log("university_vi:", university_vi);
            console.log("university_en:", university_en);

            const data = {
                id_department: selectedDepartments,
                title_en: title_en,
                title_vi: title_vi,
                content_en: contentEN,
                content_vi: contentVI,
                thumbnail: imageUrl,
                type_university_vi: university_vi,
                type_university_en: university_en
            };
        
            SaveDataNewsAdmissions(data)
                .then((response) => {
                    console.log("Phản hồi từ máy chủ:", response);
                })
                .catch((error) => {
                    console.error("Lỗi khi gửi dữ liệu:", error);
                });
        }      
    };

    useEffect(() => {
        getCategorys();
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setLayout("col");
                setDisableRowLayout(true);
            } else {
                setDisableRowLayout(false);
            }
            console.log(window.innerWidth);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    //hangle data save
    const handleENChange = (event, editor) => {
        const data = editor.getData();
        setContentEN(data);
    };

    const handleVIChange = (event, editor) => {
        const data = editor.getData();
        setContentVI(data);
    };

    const handleCategoryChange = (value, option) => {


        setSelectedCategory(value);
        const university_vi = value === 1 ? type_university[0].type_university_vi : type_university[1].type_university_vi;
        const university_en = value === 1 ? type_university[0].type_university_en : type_university[1].type_university_en;
        console.log("university_vi:", university_vi);
        console.log("university_en:", university_en);
    };
    const handleDepartmentsChange = (value, option) => {
        
        setSelectedDepartments(value);
    };
    //hangle Layout 
    const handleToggleLayout = (_layout) => {
        setLayout(_layout);
        if (_layout === "col") {
            setCollapsedNav(false);
        } else {
            setCollapsedNav(true);
        }
    };

    //hangle Img
    const handleChange = (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            // done thì lấy được url hình
            setImageUrl(info.file.response.imageUrl);
            setLoading(false);
        }
        if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
            setLoading(false);
        }
    };

    const beforeUpload = (file) => {
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!");
        }
        return isJpgOrPng;
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    //config CKEditor 
    const items = [
        {
            key: "1",
            label: "Tạo bài viết tiếng việt",
            children: "<p></p>",
        },
        {
            key: "2",
            label: "Tạo bài viết tiếng anh",
            children: "<p></p>",
        },
    ];

    return (
        <div>
            <div className="CreateNews flex flex-col gap-7 items-start">
                <div className="flex items-start justify-between w-full">
                    <Breadcrumbs underline="hover">
                        <BreadcrumbItem>Admin Dashboard</BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/admin/post">Quản lý bài viết</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>Thêm bài viết</BreadcrumbItem>
                    </Breadcrumbs>
                    <div className="flex gap-2">
                        <Tooltip title="Chế độ 1 cột">
                            <Button
                                isIconOnly
                                variant={layout === "col" ? "solid" : "light"}
                                radius="full"
                                onClick={() => {
                                    handleToggleLayout("col");
                                }}
                            >
                                <i className="fa-solid fa-table-list"></i>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Chế độ song song">
                            <Button
                                isIconOnly
                                variant={layout === "row" ? "solid" : "light"}
                                radius="full"
                                onClick={() => {
                                    handleToggleLayout("row");
                                }}
                                isDisabled={disableRowLayout}
                            >
                                <i className="fa-solid fa-table-columns"></i>
                            </Button>
                        </Tooltip>
                    </div>
                </div>

                <div className="flex w-full gap-8">
                    <div className="flex flex-1 flex-col gap-2 w-full">
                        <p className="text-sm">
                            Ảnh bìa bài viết{" "}
                            <span className="text-red-500 font-bold">*</span>
                        </p>
                        <ImgCrop
                            aspect={4 / 3}
                            modalTitle="Cắt hình ảnh"
                            rotationSlider
                            showReset
                        >
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={`${process.env.REACT_APP_API_DOMAIN}/admin/upload-image-`}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageUrl ? (
                                    <img src={imageUrl} alt="avatar" />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                        </ImgCrop>
                    </div>

                    <div className="flex flex-1 flex-col gap-2 w-full">


                    {stype === 1 ? (
                            <div>
                                <p className="text-sm">
                                    Thể loại{" "}
                                    <span className="text-red-500 font-bold">*</span>
                                </p>
                                <Select
                                    defaultValue="Chọn loại"
                                    onChange={handleCategoryChange}
                                    size="large"
                                >
                                    {CategoryData.map((category) => (
                                        <Option
                                            key={category.id_category}
                                            value={category.id_category}
                                        >
                                            {category.name_vi} ({category.name_en})
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                        ) : (
                            <div>
                                <div>
                                    <p className="text-sm">
                                        Thể loại{" "}
                                        <span className="text-red-500 font-bold">*</span>
                                    </p>
                                    <Select
                                        defaultValue="Chọn loại"
                                        onChange={handleCategoryChange}
                                        size="large"
                                    >
                                        {type_university.map((type) => (
                                            <Option 
                                                key={type.id}
                                                value={type.id}
                                            >
                                                {type.type_university_vi}({type.type_university_en})
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                                <div>
                                    <p className="text-sm">
                                        Chọn Bộ Môn{" "}
                                        <span className="text-red-500 font-bold">*</span>
                                    </p>
                                    <Select
                                        defaultValue="Chọn loại"
                                        onChange={handleDepartmentsChange}
                                        size="large"
                                    >
                                        {departments.map((departments) => (
                                            <Option
                                                key={departments.id_department}
                                                value={departments.id_department}
                                            >
                                                {departments.name_department_vi}({departments.name_department_en})
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div
                    className={`flex w-full gap-${
                        layout === "col" ? "10" : "8"
                    } flex-${layout}`}
                >
                    <div
                        className={`${
                            layout === "col" ? "w-full" : "w-[40%]"
                        } flex-1 flex flex-col gap-6`}
                    >
                        <Input
                            label={
                                <p>
                                    Nhập tiêu đề tiếng Việt{" "}
                                    <span className="text-red-500 font-bold">
                                        *
                                    </span>
                                </p>
                            }
                            placeholder="Nhập tiêu đề tiếng Việt"
                            labelPlacement="outside"
                            startContent={
                                <Avatar
                                    className="w-5 h-5"
                                    src="https://flagcdn.com/vn.svg"
                                />
                            }
                            isClearable
                            radius="sm"
                            value={titleVI}
                            onValueChange={setTitleVI}
                        />
                        <div className="flex flex-col gap-2">
                            <p className="text-sm">
                                Nội dung bài viết tiếng Việt{" "}
                                <span className="text-red-500 font-bold">
                                    *
                                </span>
                            </p>
                            <CKEditor
                                editor={ClassicEditor}
                                data={items[0].children}
                                onChange={(event, editor) => {
                                    handleVIChange(event, editor);
                                }}
                                config={{
                                    ckfinder: {
                                        uploadUrl: `${process.env.REACT_APP_API_DOMAIN}/admin/upload-image`,
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <div
                        className={`${
                            layout === "col" ? "w-full" : "w-[40%]"
                        } flex-1 flex flex-col gap-6`}
                    >
                        <Input
                            label="Tiêu đề bài viết tiếng Anh"
                            placeholder="Nhập tiêu đề tiếng Anh"
                            labelPlacement="outside"
                            startContent={
                                <Avatar
                                    className="w-5 h-5"
                                    src="https://flagcdn.com/gb.svg"
                                />
                            }
                            isClearable
                            radius="sm"
                            value={titleEN}
                            onValueChange={setTitleEN}
                        />
                        <div className="flex flex-col gap-2">
                            <p className="text-sm">
                                Nội dung bài viết tiếng Anh
                            </p>
                            <CKEditor
                                editor={ClassicEditor}
                                data={items[1].children}
                                onChange={(event, editor) => {
                                    handleENChange(event, editor);
                                }}
                                config={{
                                    ckfinder: {
                                        uploadUrl: `${process.env.REACT_APP_API_DOMAIN}/admin/upload-image`,
                                    },
                                }}
                            />
                            <div className="text-[12px] opacity-50">
                                <i className="fa-solid fa-circle-info mr-1"></i>
                                Bài viết tiếng Anh là không bắt buộc
                            </div>
                        </div>
                    </div>
                </div>
                <Button onClick={SaveData} color="primary" radius="sm">
                    <span className="font-medium">Tạo bài viết</span>
                </Button>
            </div>
        </div>
    );
};

export default CreatePost;
