import React, {useContext, useEffect} from 'react';
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
import OrdersPage from '../Admin/OrdersPage';
import socketIOClient from 'socket.io-client';
import { Context } from '../../main';

const Admin = () => {
  const {order} = useContext(Context)
  useEffect(() => {
    const socket = socketIOClient(import.meta.env.VITE_API_URL);
    socket.on('newOrderToAdmin', () => {
      order.updateOrders()
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}
  
export default Admin;