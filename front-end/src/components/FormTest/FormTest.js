import React, { useState } from 'react';
import axios from 'axios';

function FormTest() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Lấy CSRF token từ cookie
    const csrfToken = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN=')).split('=')[1];

    // Đính kèm CSRF token vào header của yêu cầu
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      },
    };

    // Gửi yêu cầu POST đến API endpoint /test trong Laravel backend với dữ liệu và cấu hình đã được thiết lập
    axios.post('http://localhost:8000/test', formData, config)
      .then(response => {
        console.log('User created successfully:', response.data);
        // Có thể thực hiện các thao tác sau khi tạo người dùng thành công
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <div className="App">
      <h1>Create User</h1>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormTest;
