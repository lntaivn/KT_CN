import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { GetNewCanUpdate, GetAllCategories, PutNewsByID } from "../../../../service/ApiService";
import { Collapse, Input, Upload, Select, Button, Image, message } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';

import { Link, useParams } from "react-router-dom";
import "./UpdateNews.css";
const { Option } = Select;
const { Panel } = Collapse;



const UpdateNews = () => {
    const { id } = useParams();
    const [newsDetailData, setNewsDetailData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [CategoryData, setCategoryData] = useState([]);
    const [contentEN, setContentEN] = useState("");
    const [contentVI, setContentVI] = useState("");


    const [setContent_en, getContent_en] = useState("");
    const [setContent_vi, getContent_vi] = useState("");

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
    };


    const getCategorys = async () => {
        try {
          const response = await GetAllCategories();
          console.log("News data:", response.data);
          setCategoryData(response.data);
    
        } catch (error) {
          console.error("Error fetching news:", error);
        }
      };



    const getDetailNews = async () => {

        try {
            const response = await GetNewCanUpdate(id);
            console.log("newsDetailData:", response.data);
            setNewsDetailData(response.data);
            if (response.data.length > 0) {
                const imageUrlFromResponse = response.data[0].thumbnail;
                const categoryFromResponse = response.data[0].id_category;
                const content_enFromResponse = response.data[0].content_en;
                const content_viFromResponse = response.data[0].content_vi;
                getContent_en(content_enFromResponse)
                getContent_vi(content_viFromResponse)
                setSelectedCategory(categoryFromResponse)
                setImageUrl(imageUrlFromResponse);
                setContentEN(content_enFromResponse)
                setContentVI(content_viFromResponse)
            } else {
                console.error("No data found in the response");
            }
        } catch (error) {
            console.error("Error fetching newsDetailData:", error);
        }
    };
    useEffect(() => {
        getDetailNews()
        getCategorys()
    }, []);



    
    
      const handleChange = info => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {
          // done thì lấy được url hình
          setImageUrl(info.file.response.imageUrl);
          setLoading(false);
        }
        if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
          setLoading(false);
        }
      };
    
      const beforeUpload = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      };
    
      const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );

      
    const items = [
        {
          key: '1',
          label: 'Tạo bài viết tiếng việt',
        },
        {
          key: '2',
          label: 'Tạo bài viết tiếng anh',
        }
      ];
      

      const Update = () => {
        const title_viElement = document.getElementById('title_vi');
        const title_vi = title_viElement ? title_viElement.value : null;
    
    
        const title_enElement = document.getElementById('title_en');
        const title_en = title_enElement ? title_enElement.value : null;
    
        PutNewsByID(id,selectedCategory, title_en, title_vi, contentEN, contentVI, imageUrl)
          .then(response => {
            console.log('Phản hồi từ máy chủ:', response);
          })
          .catch(error => {
            console.error('Lỗi khi gửi dữ liệu:', error);
          });
    };



    return (
        <div>
            <div className='CreateNews'>
                <h1>Tạo bài viết mới</h1>
                {
                newsDetailData.map(news =>(
                    <Input.TextArea id='title_vi' defaultValue={news.title_vi} rows={2} placeholder="Nhập tiêu đề tiếng việt" />
                    ))
                }
                <br />
                <br />

                {
                newsDetailData.map(news =>(
                    <Input.TextArea id='title_en' defaultValue={news.title_en} rows={2} placeholder="Nhập tiêu đề tiếng anh" />
                    ))
                }
                <br />
                <br />

                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="http://127.0.0.1:8000/api/admin/upload-image-" // Thay đổi URL tại đây
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    >
                    {imageUrl ? (
                        <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />      
                    ) : (
                        uploadButton
                    )}
                </Upload>
                <br />
                <br />


                <Select defaultValue="Chọn loại" style={{ width: 200 }} onChange={handleCategoryChange}  value={selectedCategory}>
                {CategoryData.map(category => (
                    <Option key={category.id_category} value={category.id_category}>
                    {category.name_vi}
                    </Option>
                ))}
                </Select>

                <Collapse>
                {items.map(item => (
                    <Panel key={item.key} header={item.label}>
                    <CKEditor
                        editor={ClassicEditor}
                        data = {item.key === '1'? setContent_vi: setContent_en }
                        onChange={(event, editor) => {
                        if (item.key === '1') {
                            handleVIChange(event, editor);
                        } else if (item.key === '2') {
                            handleENChange(event, editor);
                        }
                        }}

                        config={{
                        ckfinder: {
                            uploadUrl: 'http://127.0.0.1:8000/api/admin/upload-image'
                        }
                        }}
                    />
                    </Panel>
                ))}
                </Collapse>
                <br />
                <br />
                <Button type="dashed" onClick={Update}>Get Data</Button>
            </div>
        </div>
    );
};

export default UpdateNews;
