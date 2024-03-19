import React, { useContext, useState, useEffect } from 'react';
import Backdrop from '../../Backdrop';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import dropIn from '../../../utils/modalAnimation';
import { Context } from '../../../main';
import InputMask from 'react-input-mask';
import OrderModalDeviceCard from './orderModalDeviceCard';
import updateOrder from '../../axios-components/order/updateOrder';

const ModalOrderCard = ({handleClose, order}) => {
  const [orderInfo, setOrderInfo] = useState(order);
  const {device} = useContext(Context)
  const [dataDeliveryTypes, setDataDeliveryTypes] = useState(null)

  const updateOrderInfo = (path, value) => {
    setOrderInfo(prevState => {
      let newState = {...prevState};
      let pathParts = path.split('.');
      let lastPart = pathParts.pop();
      let obj = pathParts.reduce((obj, pathPart) => obj[pathPart], newState);
      obj[lastPart] = value;
      return newState;
    });
  };
  
  const handleUpdateOrder = async () => {
    await updateOrder({orderInfo: orderInfo})
  }

  useEffect(() => {
    fetch('/delivery.json')
      .then(response => response.json())
      .then(data => setDataDeliveryTypes(data.delivery))
      .catch(error => console.error(error));
  }, []);

  if(!dataDeliveryTypes) return <></>
  return(
    <Backdrop onClick={handleClose}>
      <motion.div 
        className="customModal orderModal"
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial={"hidden"}
        animate={"visible"}
        exit={"exit"}
      >
        <div className="orderModalHeader">
          Замовлення №{orderInfo.orderNumber}
        </div>
        <div className="orderModalContent">
          <div className="orderModalMainInfoList">
            <div className="orderModalLeftBlock">
              <h5>Особисті дані</h5>
              <div className="orderModalContentItem">
                <p className='orderModalItemTitle'>ПІБ:</p>
                <input 
                  className='orderItemValue orderItemValueInput' 
                  onChange={(e) => updateOrderInfo('user.secondName', e.target.value)}
                  defaultValue={orderInfo.user.secondName}
                />
                <input 
                  className='orderItemValue orderItemValueInput' 
                  onChange={(e) => updateOrderInfo('user.firstName', e.target.value)}
                  defaultValue={orderInfo.user.firstName}
                />
                <input 
                  className='orderItemValue orderItemValueInput' 
                  onChange={(e) => updateOrderInfo('user.patronymic', e.target.value)}
                  defaultValue={orderInfo.user.patronymic}
                />
              </div>
              <h5>Контактна інформація</h5>
              <div className="orderModalContentItem">
                <p className='orderModalItemTitle'>Пошта:</p>
                <input className='orderItemValue orderItemValueInput' defaultValue={orderInfo.user.email}
                onChange={(e) => updateOrderInfo('user.email', e.target.value)}></input>
              </div>
              <div className="orderModalContentItem">
                <p className='orderModalItemTitle'>Номер телефону:</p>
                <InputMask mask="+38 (099) 999-99-99" maskChar=" " defaultValue={orderInfo.user.phoneNumber}
                  onChange={(e) => updateOrderInfo('user.phoneNumber', e.target.value)}>
                  {() => <input className='orderItemValue orderItemValueInput'></input>}
                </InputMask>
              </div>
              <h5>Створено</h5>
              <p>{(new Date(orderInfo.orderInformation.createdAt)).toString()}</p>
            </div>
            <div className="orderModalRightBlock">
              <h5>Інформація про доставку</h5>
              <div className="orderModalContentItem">
                <p className='orderModalItemTitle'>Тип доставки:</p>
                <select className='orderItemValue orderItemValueInput' defaultValue={orderInfo.delivery.deliveryType} onChange={(e) => updateOrderInfo('delivery.deliveryType', e.target.value)}>
                  {dataDeliveryTypes.map((type, index) => (
                    <option value={type.name} key={index}>{type.name}</option>
                  ))}
                </select>
              </div>
              {order.delivery.deliveryType == "Укрпошта" ? 
                <div className="orderModalContentItem">
                  <p className='orderModalItemTitle'>Поштовий індекс:</p>
                  <input className='orderItemValue orderItemValueInput' defaultValue={orderInfo.delivery.postalCode}
                  onChange={(e) => updateOrderInfo('delivery.postalCode', e.target.value)}></input>
                </div> :
                <div className="orderModalContentItem">
                  <p className='orderModalItemTitle'>Адреса:</p>
                  <input 
                    className='orderItemValue orderItemValueInput' 
                    defaultValue={orderInfo.delivery.locality}
                    onChange={(e) => updateOrderInfo('delivery.locality', e.target.value)}
                  />
                  <input 
                    className='orderItemValue orderItemValueInput' 
                    defaultValue={orderInfo.delivery.street}
                    onChange={(e) => updateOrderInfo('delivery.street', e.target.value)}
                  />
                  <input 
                    className='orderItemValue orderItemValueInput' 
                    defaultValue={orderInfo.delivery.house}
                    onChange={(e) => updateOrderInfo('delivery.house', e.target.value)}
                  />
                  <input 
                    className='orderItemValue orderItemValueInput' 
                    defaultValue={orderInfo.delivery.apartment}
                    onChange={(e) => updateOrderInfo('delivery.apartment', e.target.value)}
                  />
                </div>
              }
              <h5>Інформація про оплату</h5>
              <div className="orderModalContentItem">
                <p className='orderModalItemTitle'>Тип оплати:</p>
                <p className='orderItemValue'>{orderInfo.paymentMethod}</p>
              </div>
              <div className="orderModalContentItem">
                <p className='orderModalItemTitle'>Ціна доставки:</p>
                <p className='orderItemValue'>{orderInfo.orderInformation.deliveryPrice}<span> ₴</span></p>
              </div>
              <div className="orderModalContentItem">
                <p className='orderModalItemTitle'>Ціна товарів:</p>
                <p className='orderItemValue'>{orderInfo.orderInformation.devicesPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}<span> ₴</span></p>
              </div>
            </div>
          </div>
          <h5 style={{textAlign: 'center', marginTop: '10px'}}>Товари</h5>
          <div className="orderModalDevicesList">
            {orderInfo.orderInformation.devices.map(product => {
              const foundedDevice = device._devices.rows.find(device => device._id == product.product);
              console.log(product) //TODO в новых заказах product не имеет product
              return (
                <div key={foundedDevice._id} className='orderModalDeviceCardContainer'>
                  <OrderModalDeviceCard device={foundedDevice}/>
                  <div className="count"> x {product.quantity}</div>
                </div>
              );
            })}
          </div>
        </div>
        {order != orderInfo && <div className="orderModalFooter">
          <button className='button' onClick={handleUpdateOrder}>Зберегти замовлення</button>
        </div>}
      </motion.div>
    </Backdrop>
  )
}
 
export default observer(ModalOrderCard);