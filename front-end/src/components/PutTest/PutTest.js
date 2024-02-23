import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PutTest() {
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        email: '',
        created_at: null,
        updated_at: null
    });

    useEffect(() => {
        // Phân tích query string từ URL để lấy thông tin người dùng
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const userData = urlParams.get('user');
        
        // Kiểm tra xem có thông tin người dùng được truyền từ URL không
        if (userData) {
            const user = JSON.parse(userData);
            setFormData(user);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gửi dữ liệu cập nhật lên server
        console.log(formData)
        if(!formData){
            return;
        }
        axios.put(`http://localhost:8000/test/update/${formData.id}`, formData)
            .then(response => {
                console.log('User updated successfully:', response.data);
  
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    };

    return (
        <div>
            <h1>Update User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" id="updatetest">Update</button>
            </form>
        </div>
    );
}

export default PutTest;
