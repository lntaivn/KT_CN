import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Collapse } from 'antd';

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



const Ckeditor  = ({ initialValue }) => {
    const [editorData, setEditorData] = useState(initialValue);

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };

    return (
        <div>
            <form>
                đơn
            </form>
             <Collapse>
                {items.map(item => (
                    <Panel key={item.key} header={item.label}>
                        <CKEditor
                            editor={ClassicEditor}
                            data={item.children}
                            onChange={(event, editor) => {
                                console.log('Data:', editor.getData());
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
        </div>
    );
}

export default Ckeditor;
