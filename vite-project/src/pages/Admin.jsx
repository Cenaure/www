import React from 'react';
import AdminLeftNavbar from '../components/Admin/adminLeftNavbar';
import { Routes, Route } from 'react-router-dom';
import DevicesPage from './Admin/DevicesPage';
import "../css/pages/admin.css"
const Admin = () => {
  
  return(
    <div className='adminContent'>
      <AdminLeftNavbar />
      <div className="content">
        <Routes>
          <Route path="/devices/*" element={<DevicesPage />} />
        </Routes>
      </div>
    </div>
  );
}
 
export default Admin;