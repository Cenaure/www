import React, { useContext, useState } from 'react';
import cart from "../../css/imgs/cart.png" 
import heart from "../../css/imgs/heart.png" 
import scales from "../../css/imgs/scales.svg" 
import { NavLink } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import addToCart from '../axios-components/cart/addToCart';
import { Context } from '../../main';

const DeviceItem = ({device, index, userId, basket}) => {
  const [isHovered, setIsHovered] = useState(false);
  const imageUrl = import.meta.env.VITE_API_URL + (isHovered && device.imgs[1] ? device.imgs[1] : device.imgs[0]);

  const handleAddToCart = async () => {
    await addToCart(device._id, 1, userId)
    basket.updateBasket(userId)
    basket.setOpen(true)
  }

  return(
    <NavLink to={`/device/${device._id}`} style={{ textDecoration: 'none', color: 'inherit' }} key={index} onMouseMoveCapture={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
      <div className="deviceCard">
        <div className='cardImageContainer'><Image src={imageUrl}></Image></div>
        <div className="deviceCardContent mt-1">
          <p>{device.name}</p>
          <div className="footer">
            <h4 style={{margin: '0', color: 'rgb(234, 105, 69)'}}>{device.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}<span style={{fontSize: '22px'}}> ₴</span></h4>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <button onClick={(e) => e.preventDefault()}><Image src={scales}></Image></button>
              <button onClick={(e) => e.preventDefault()}><Image src={heart}></Image></button>
              <button className='cardBasketAdd' onClick={(e) => {e.preventDefault(), handleAddToCart()}}><Image src={cart}></Image></button>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  )
}
 
export default DeviceItem;