import React, { useState ,useEffect} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Collapse, Input, Upload, Select, Button, Image  } from 'antd'; 
import { PlusOutlined } from '@ant-design/icons';
import { GetAllCategories, SaveDataNewViEn } from "../../../../service/ApiService";
import "./CreateNews.css"
const { Option } = Select;
const { Panel } = Collapse;

const items = [
  {
    key: '1',
    label: 'Tạo bài viết tiếng việt',
    children: "<p>Nhập nội dung bằng tiếng việt</p>",
  },
  {
    key: '2',
    label: 'Tạo bài viết tiếng anh',
    children: "<p>Nhập nội dung bằng tiếng anh</p>",
  }
];

const CreateNews = () => {
const [selectedCategory, setSelectedCategory] = useState("");

  const [CategoryData, setCategoryData] = useState([]); 
  const [contentEN, setContentEN] = useState("");
  const [contentVI, setContentVI] = useState("");

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

    useEffect(() => {
        getCategorys();
    }, []);
    const SaveData = () => {
        const title_viElement = document.getElementById('title_vi');
        const title_vi = title_viElement ? title_viElement.value : null;
   

        const title_enElement = document.getElementById('title_en');
        const title_en = title_enElement ? title_enElement.value : null;
  

        console.log('id_category:', selectedCategory);

        SaveDataNewViEn(selectedCategory, title_en, title_vi, contentEN, contentVI)
        .then(response => {
            console.log('Phản hồi từ máy chủ:', response);
        })
        .catch(error => {
            console.error('Lỗi khi gửi dữ liệu:', error);
        });
    }        



  return (
    <div>
        <div className='CreateNews'>
            <h1>Tạo bài viết mới</h1>
            <Input.TextArea id='title_vi' rows={2} placeholder="Nhập tiêu đề tiếng việt" />
            <br />
            <br />
            <Input.TextArea id='title_en' rows={2} placeholder="Nhập tiêu đề tiếng anh" />
            <br />
            <br />
        
            <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <Select defaultValue="Chọn loại" style={{ width: 200 }} onChange={handleCategoryChange}>
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
                    data={item.children}
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
            <Button type="dashed"  onClick={SaveData}>Get Data</Button>
        </div>
    </div>
  );
}

export default CreateNews;
