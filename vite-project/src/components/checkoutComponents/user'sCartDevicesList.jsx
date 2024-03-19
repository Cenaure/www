import React, {useContext, useState} from 'react';
import { Context } from '../../main';
import { Image } from 'react-bootstrap';
const UserCartDevicesList = ({isLoading, handleOrderCreate, delivery}) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")))
  const {user, basket, device} = useContext(Context);
  const items = basket._cart.items || cart;
  const [devices, setDevices] = useState(device._devices)
  const total = items?.reduce((sum, item) => {
    const id = item.product ? item.product : item._id;
    const device = devices.rows.find(device => device._id === id);
    return sum + (device.price * item.quantity);
  }, 0);

  if(isLoading) return <></>
  return(
    <div className="checkoutDevices">
      <div className="header">
        <div>Замовлення</div>
        <div className="changeBasket" onClick={() => basket.setOpen(true)}>Редагувати</div>
      </div>
      <div className="checkoutDevicesContainer">
        {items?.map((item, index) => {
          const id = item.product ? item.product : item._id;
          if (devices.rows.filter(device => device._id === id)) {
            const device = devices.rows.filter(device => device._id === id)[0];
            return (
              <div key={index} className='cartDeviceCard checkoutItem'>
                <Image src={import.meta.env.VITE_API_URL + device.imgs[0]}></Image>
                <div onClick={() => basket.setOpen(false)}><div className='cardDeviceNameContainer'><p className='m-0'>{device.name}</p></div></div>
                <div className="price cartItemPrice">{item.quantity > 1 && `${item.quantity + ' x '}`}{device.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}<span style={{fontSize: '16px'}}> ₴</span></div>
              </div>
            )
          }
          return null;
        })}
      </div>
      <div className="devicesListFooter">
        <div className="resultsList">
          <div>
            <p>{items.length} товарів на суму:</p>
            <p className='totalPrice'>
              {total?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}
              <span style={{fontSize: '15px'}}> ₴</span>
            </p>
          </div>
          <div>
            <p>Ціна доставки:</p>
            <p className='deliveryPrice'>
              {delivery ? <>{delivery.price} <span style={{fontSize: '15px'}}> ₴</span></> : "Безкоштовно"}

            </p>
          </div>
          <div style={{marginTop: '10px'}}>
            <p>Сума до сплати:</p>
            <p className='countedPrice'>
              {((delivery?.price || 0)+total)?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}
              <span style={{fontSize: '24px'}}> ₴</span>
            </p>
          </div>
        </div>
        <button className='myBtn checkoutBtn mt-3' onClick={handleOrderCreate}>Підтвердити замовлення</button>
      </div>
    </div>
  )
}
 
export default UserCartDevicesList;