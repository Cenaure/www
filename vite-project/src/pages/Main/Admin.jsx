import React from 'react';
import AdminLeftNavbar from '../../components/Admin/adminLeftNavbar';
import { Routes, Route } from 'react-router-dom';
import DevicesPage from '../Admin/DevicesPage';
import "../../css/pages/admin.css"
import DeviceCreate from '../../components/Admin/deviceCreate';
import TypesCreatePage from '../../components/Admin/typesCreatePage';
import PageNotFound from '../PageNotFound';
import CategoriesPage from '../Admin/CategoriesPage';
import BrandsPage from '../Admin/BrandsPage';
import BrandCreate from '../../components/Admin/brandCreate';
const Admin = () => {
  
  return(
    <div className='adminContent'>
      <AdminLeftNavbar />
      <div className="content">
        <Routes>
          <Route path="/devices/create" element={<DeviceCreate />} />
          <Route path="/devices/update/:id" element={<DeviceCreate />} />
          <Route path="/devices/*" element={<DevicesPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/create/*" element={<TypesCreatePage />} />
          <Route path="/categories/update/:id/*" element={<TypesCreatePage />} />
          <Route path="/brands/" element={<BrandsPage />} />
          <Route path="/brands/create" element={<BrandCreate />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}
  
export default Admin;