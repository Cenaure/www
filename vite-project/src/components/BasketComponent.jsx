import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import '../css/components/basket.css'
import { NavLink } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import deleteCartItem from './axios-components/cart/deleteCartItem';
import increaseQuantity from './axios-components/cart/increaseQuantity';
import decreaseQuantity from './axios-components/cart/decreaseQuantity';
const BasketComponent = () => {
  const {basket, device, user} = useContext(Context)
  const [devices, setDevices] = useState(device._devices)

  const variants = {
    open: { x: -20 },
    closed: { x: "100%" },
  }

  const overlayVariants = {
    open: { opacity: 0.5 },
    closed: { opacity: 0 },
  }

  const handleDelete = async (deviceId) => {
    await deleteCartItem(user._user.id, deviceId)
    basket.updateBasket(user._user.id)
  }
  
  const handleIncrease = async(deviceId) => {
    await increaseQuantity(deviceId, user._user.id)
    basket.updateBasket(user._user.id)
  }

  const handleDecrease = async(deviceId) => {
    await decreaseQuantity(deviceId, user._user.id)
    basket.updateBasket(user._user.id)
  }

  const total = basket._cart?.items.reduce((sum, item) => {
    const device = devices.rows.find(device => device._id === item.product);
    return sum + (device.price * item.quantity);
  }, 0);

  return(
    <>
      <motion.div
        initial="closed"
        animate={basket._isOpen ? "open" : "closed"}
        variants={overlayVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ position: 'fixed', backgroundColor: 'black', width: '100%', height: '100%', top: 0, left: 0, zIndex: '4' }}
        className={basket._isOpen ? 'visibleB' : 'hiddenB'}
        onClick={() => basket.setOpen(false)}
      />
      <motion.div
        initial="closed"
        animate={basket._isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className='basketContainer panel'
        style={{ position: 'fixed' }}
      >
        <div className="elementsContainer">
          <h5 style={{width: '100%'}}>Кошик</h5>
          <div className="devicesContainer">
            
            {basket._cart?.items.map((item, index) => {
              if (devices.rows.filter(device => device._id === item.product)) {
                const device = devices.rows.filter(device => device._id === item.product)[0];
                
                return (

                  <div key={index} className='cartDeviceCard'>
                    <Image src={import.meta.env.VITE_API_URL + device.imgs[0]}></Image>
                    <NavLink to={`/device/${device._id}`} onClick={() => basket.setOpen(false)}><div className='cardDeviceNameContainer'><p className='m-0'>{device.name}</p></div></NavLink>
                    <div className="counter">
                      <button className='cbutton1' onClick={() => handleDecrease(device._id)}>-</button>
                      <div>{item.quantity}</div>
                      <button className='cbutton2' onClick={() => handleIncrease(device._id)}>+</button>
                    </div>
                    <div className="price cartItemPrice">{device.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}<span style={{fontSize: '16px'}}> ₴</span></div>
                    <button style={{border: '0', backgroundColor: 'white', width: '50px', padding: '0'}} onClick={() => handleDelete(device._id)}>
                      X
                    </button>
                  </div>
                )
              }
              return null;
            })}
            {(!basket._cart || basket._cart.items.length == 0) && 
              <div className='ifNoItems'>Схоже ви ще не додали товарів до кошику 😞</div>
            }
          </div>
          {(basket._cart.items.length != 0) &&
            <div className="footerCart">
              <button className='myBtn createBtn'>Оформлення заказу</button>
              <div className="price cartTotalPrice">{total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}<span style={{fontSize: '20px'}}> ₴</span></div>
            </div>
          }
        </div>
      </motion.div>
    </>
  )
}
 
export default observer(BasketComponent);
