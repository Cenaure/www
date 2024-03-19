import React, { useContext, useEffect, useState } from 'react';
import AdminOrdersPageNavbar from '../../components/Admin/ordersPage/adminOrdersPageNavbar';
import AdminOrdersPageOrdersList from '../../components/Admin/ordersPage/adminOrdersPageOrdersList';
import { observer } from 'mobx-react-lite';
import { Context } from '../../main';
import '../../css/pages/ordersPage.css'
import { AnimatePresence } from 'framer-motion';
import ModalOrderCard from '../../components/Admin/ordersPage/modalOrderCard';

const OrdersPage = () => {
  const {order} = useContext(Context)
  const [orders, setOrders] = useState([])
  const [modalOpen, setModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const modalClose = () => setModalOpen(false);

  useEffect(() => {
    setOrders([...order._orders].reverse());
  }, [order._orders])

  useEffect(() => {
    order.updateOrders()
  }, [])
  if(!orders) return <></>
  return(
    <>
      <AdminOrdersPageNavbar />
      <AdminOrdersPageOrdersList orders={orders} setModalOpen={setModalOpen} setCurrentOrder={setCurrentOrder}/>
      <AnimatePresence
        initial={false}
        onExitComplete={() => null}
      >
        {modalOpen && <ModalOrderCard order={currentOrder} handleClose={modalClose}/>}
      </AnimatePresence>
    </>
  )
}
 
export default observer(OrdersPage);