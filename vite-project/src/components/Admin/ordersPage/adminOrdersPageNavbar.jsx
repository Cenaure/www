import React from 'react';
import resetOrdersCounter from '../../axios-components/order/resetOrdersCounter';

const AdminOrdersPageNavbar = () => {
  return(
    <div className="ordersAdminPageNavbar p-2">
      <button className='myBtn createBtn' onClick={() => resetOrdersCounter}>resetCounter</button>
    </div>
  )
}
 
export default AdminOrdersPageNavbar;