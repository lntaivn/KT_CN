import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { UserList, UserUpdate } from './components/UserList/UserList';

function App() {
  return (
    <Router>
      <div>
     
          {/* Tuyến đường cho danh sách người dùng */}
          <Route exact path="/user-list">
            <UserList />
          </Route>
          {/* Tuyến đường cho cập nhật người dùng */}
          <Route path="/test/update/:id">
            <UserUpdate />
          </Route>
        
      </div>
    </Router>
  );
}

export default App;
