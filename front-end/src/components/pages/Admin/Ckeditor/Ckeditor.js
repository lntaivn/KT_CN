import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Collapse, Button } from 'antd';

const { Panel } = Collapse;

const items = [
  {
    key: '1',
    label: 'Tạo bài viết tiếng việt',
    children: "<p>Hello from CKEditor 5!</p>",
  },
  {
    key: '2',
    label: 'Tạo bài viết tiếng anh',
    children: "<p>Hello from CKEditor 5!</p>",
  }
];

const Ckeditor = ({ initialValue }) => {
    const [editorData, setEditorData] = useState(initialValue);
    const [allEditorData, setAllEditorData] = useState({});

    const handleEditorChange = (event, editor, key) => {
        const data = editor.getData();
        setEditorData(data);
        setAllEditorData(prevState => ({ ...prevState, [key]: data }));
    };

    const handleGetData = () => {
        console.log('Data from all editors:', allEditorData);
    };

    return (
        <div>
            <h1>Form nhập lieu</h1>
            <Collapse>
                {items.map(item => (
                    <Panel key={item.key} header={item.label}>
                        <CKEditor
                            editor={ClassicEditor}
                            data={item.children}
                            onChange={(event, editor) => {
                                handleEditorChange(event, editor, item.key);
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
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
            <Button type="primary" onClick={handleGetData}>Get Data</Button>
        </div>
    );
}

export default Ckeditor;
