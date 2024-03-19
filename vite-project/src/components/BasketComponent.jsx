import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import '../css/components/basket.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import deleteCartItem from './axios-components/cart/deleteCartItem';
import increaseQuantity from './axios-components/cart/increaseQuantity';
import decreaseQuantity from './axios-components/cart/decreaseQuantity';
import { useMediaPredicate } from 'react-media-hook';
import { decreaseLocalStorageCartQuantity, deleteLocalStorageCartItem, increaseLocalStorageCartQuantity } from './localStorageCart';

const BasketComponent = () => {
  const {basket, device, user} = useContext(Context)
  const [devices, setDevices] = useState(device._devices)
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")))
  const lessThan739 = useMediaPredicate('(max-width: 739px)')
  const navigate = useNavigate();

  const variants = {
    open: { x: !lessThan739 ? -20 : 0 },
    closed: { x: "100%" },
  }

  const overlayVariants = {
    open: { opacity: 0.5 },
    closed: { opacity: 0 },
  }

  const handleDelete = async (deviceId) => {
    if(user.isAuth){
      await deleteCartItem(user._user.id, deviceId)
      basket.updateBasket(user._user.id)
    }
    else {
      deleteLocalStorageCartItem(deviceId)
      setCart(JSON.parse(localStorage.getItem("cart")))
    }
  }
  
  const handleIncrease = async(deviceId) => {
    if(user.isAuth){
      await increaseQuantity(deviceId, user._user.id)
      basket.updateBasket(user._user.id)
    } else{
      increaseLocalStorageCartQuantity(deviceId)
      setCart(JSON.parse(localStorage.getItem("cart")))
    }
  }

  const handleDecrease = async(deviceId) => {
    if(user.isAuth){
      await decreaseQuantity(deviceId, user._user.id)
      basket.updateBasket(user._user.id)
    } else {
      decreaseLocalStorageCartQuantity(deviceId)
      setCart(JSON.parse(localStorage.getItem("cart")))
    }
  }
  
  const items = basket._cart.items || cart;
  const total = items?.reduce((sum, item) => {
      const id = item.product ? item.product : item._id;
      const device = devices.rows.find(device => device._id === id);
      return sum + (device.price * item.quantity);
  }, 0);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")))
  }, [localStorage.getItem("cart")])
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
          <h5 style={{width: '100%'}} className='mb-1'>Кошик <button className='closeBtn' onClick={() => basket.setOpen(false)}>✕</button></h5>
          
          <div className="devicesContainer">
            {items?.map((item, index) => {
              const id = item.product ? item.product : item._id;
              if (devices.rows.filter(device => device._id === id)) {
                const device = devices.rows.filter(device => device._id === id)[0];
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
            {(items?.length == 0 || basket._cart.items?.length == 0) && 
              <div className='ifNoItems'>Схоже ви ще не додали товарів до кошику 😞</div>
            }
          </div>
          {(basket._cart.items?.length != 0 && items?.length > 0) &&
            <div className="footerCart">
              <button className='myBtn createBtn' onClick={() => {navigate('/checkout'), basket.setOpen(false)}}>Оформлення заказу</button>
              <div className="price cartTotalPrice">{total?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}<span style={{fontSize: '20px'}}> ₴</span></div>
            </div>
          }
        </div>
      </motion.div>
    </>
  )
}
 
export default observer(BasketComponent);
