import React from 'react';
import AdminOrderCard from './orderCard';

const AdminOrdersPageOrdersList = ({orders, setModalOpen, setCurrentOrder}) => {
  return(
    <div className="">
      {orders.map((order) =>  (
        <AdminOrderCard order={order} key={order.orderNumber} setCurrentOrder={setCurrentOrder} setModalOpen={setModalOpen}/>
      ))}
    </div>
  )
}
 
export default AdminOrdersPageOrdersList;