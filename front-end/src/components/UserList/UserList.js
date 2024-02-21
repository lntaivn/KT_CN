import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function UserUpdate() {
  const { id } = useParams(); // Lấy id từ URL
  
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Gọi API để lấy dữ liệu người dùng từ id
    fetch(`http://localhost:8000/test/update/${id}`)
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, [id]);

  return (
    <div>
      <h2>Update User: {id}</h2>
      {userData && (
        <div>
          <p>User ID: {userData.id}</p>
          <p>User Name: {userData.name}</p>
        </div>
      )}
    </div>
  );
}

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách người dùng
    fetch('http://localhost:8000/test') 
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);
    
  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.id}</li>
        ))}
      </ul>
      <h2>Update User:</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {/* Sử dụng Link để điều hướng đến trang cập nhật người dùng */}
            <Link to={`/test/update/${user.id}`}>
              Update User {user.id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { UserList, UserUpdate };
