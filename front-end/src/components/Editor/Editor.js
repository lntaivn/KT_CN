import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

import "./Editor.css"
const Editor = () => {
    const [editorData, setEditorData] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [viewCount, setViewCount] = useState(0);
    const [timeUpload, setTimeUpload] = useState(new Date().toISOString()); // Lấy thời gian hiện tại
    const [image, setImage] = useState("");

    const handleSave = () => {
        const formData = {
            title: title,
            description: description,
            content: editorData,
            view_count: viewCount,
            time_upload: timeUpload,
            image: image
        };

        axios.post('http://localhost:8000/news/createNew/', formData)
            .then(response => {
                console.log(response.data);
                alert('Success');
            })
            .catch(error => {
                console.error('Error saving data:', error);
            });

    };

    


    return (
        <div className="App">
            <h2>Create News</h2>
            <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <br />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <br />


            <div className='CKEditor'>
                <CKEditor
                    editor={ClassicEditor}
                    data={editorData}
                    onReady={(editor) => {
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setEditorData(data);
                        console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                    config={{
                        ckfinder: {
                            uploadUrl: 'http://localhost:8000/upload',
                            options: {
                                resourceType: 'Images',
                            }
                        },
                    }}
                />
                 <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default Editor;
