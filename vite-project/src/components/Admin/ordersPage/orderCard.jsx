import React from 'react';

const AdminOrderCard = ({order, setModalOpen, setCurrentOrder}) => {
  return(
    <div className="orderCard" onClick={() => {setModalOpen(true), setCurrentOrder(order)}}>
      <div className="orderLeft">
        <div className="orderHeader">
          <h5>Замовлення №{order.orderNumber}</h5>
          <div className="orderContentItem">
            <h5 className='orderItemTitle'>Статус:</h5>
            <h5 className='orderItemValue'>{order.orderInformation.status}</h5>
          </div>
        </div>
        <div className="orderContent">
          <div className="orderContentItem">
            <p className='orderItemTitle'>ПІБ:</p>
            <p className='orderItemValue'>{order.user.secondName} {order.user.firstName} {order.user.patronymic}</p>
          </div>
        </div>
      </div>
      <div className="orderRight">
        <div className="orderHeaderRightPart">
          <p>Сумма замовлення</p>
          <p style={{float: 'right'}}>{order.orderInformation.devicesPrice}</p>
        </div>
      </div>
    </div>
  )
}
 
export default AdminOrderCard;