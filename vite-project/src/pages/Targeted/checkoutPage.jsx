import React, { useState, useEffect, useContext } from 'react';
import '../../css/pages/checkout.css'
import { observer } from 'mobx-react-lite';
import UserCartDevicesList from '../../components/checkoutComponents/user\'sCartDevicesList';
import CheckoutForms from '../../components/checkoutComponents/checkoutForms';
import Loader from '../../components/loader';
import createOrder from '../../components/axios-components/order/createOrder';
import { Context } from '../../main';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearCart } from '../../components/localStorageCart';
import orderValidation from '../../components/validation/orderValidation';
import deleteCart from '../../components/axios-components/cart/deleteCart.jsx'

const CheckoutPage = (() => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")))
  const {user, basket, device} = useContext(Context);
  const items = basket._cart.items || cart;
  const [devices, setDevices] = useState(device._devices)
  const total = items?.reduce((sum, item) => {
    const id = item.product ? item.product : item._id;
    const device = devices.rows.find(device => device._id === id);
    return sum + (device.price * item.quantity);
  }, 0);
  console.log(items)
  const [firstName, setFirstName] = useState(user._user?.firstName || '');
  const [secondName, setSecondName] = useState(user._user?.secondName || '');
  const [patronymic, setPatronymic] = useState('');
  const [email, setEmail] = useState(user._user?.email || '');
  const [phoneNumber, setProheNumber] = useState('');

  const [city, setCity] = useState('');
  const [delivery, setDelivery] = useState('');
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [postindex, setPostindex] = useState('');
  const [paymentMethod, setPaymentPethod] = useState('');

  const [data, setData] = useState(null);
  const [dataStates, setDataStates] = useState(null);
  const [dataCities, setDataCities] = useState(null);
  const [dataDeliveryTypes, setDataDeliveryTypes] = useState(null);

  const [filteredData, setFilteredData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleSecondNameChange = (event) => {
    setSecondName(event.target.value);
  };

  const handlePatronymicChange = (event) => {
    setPatronymic(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setProheNumber(event.target.value);
  };

  const handleDeliveryChange = (event) => {
    const selectedType = dataDeliveryTypes.find(type => type.name === event.target.value);
    setDelivery(selectedType);
  };

  const handlePostindexChange = (newValue) => {
    setPostindex(newValue);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentPethod(event.target.value);
  };

  const handleCityChange = (newValue) => {
    if (typeof newValue === 'string') {
      setCity(newValue.target.textContent);
    } else if (newValue instanceof Object) {
      setCity(newValue.target.textContent);
    } else if (newValue == null) setCity(null), setDelivery(null)
  };

  const [errors, setErrors] = useState({
    firstName: false,
    secondName: false,
    patronymic: false,
    email: false,
    phoneNumber: false,
    locality: false,
    deliveryType: false,
    postalCode: false,
    street: false,
    house: false,
    apartment: false,
    paymentMethod: false
  });

  const navigate = useNavigate();
  const handleOrderCreate = async () => {
    const errors = await orderValidation({
      firstName,
      secondName,
      patronymic,
      email,
      phoneNumber,
      locality: city,
      deliveryType: delivery.name,
      postalCode: postindex,
      street,
      house,
      apartment: apartmentNumber,
      paymentMethod,
    });

    if(Object.values(errors).some(error => error)) {
      setErrors(errors);
      console.log(errors);
    } else {
      await createOrder({
        firstName,
        secondName,
        patronymic,
        email,
        phoneNumber,
        locality: city,
        deliveryType: delivery.name,
        postalCode: postindex,
        street,
        house,
        apartment: apartmentNumber,
        paymentMethod,
        devices: items,
        deliveryPrice: delivery.price,
        devicesPrice: total, 
        createdAt: new Date()
      })
      navigate('succeed');

      if(user.isAuth) {await deleteCart({userId: user._user.id}), basket.updateBasket(user._user.id)}
      else clearCart();
    }
  }

  useEffect(() => {
    fetch('/ukrpostaIndex.json')
      .then(response => response.json())
      .then(data => {setData(data), setFilteredData(data)})
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch('/ua_locations.json')
      .then(response => response.json())
      .then(data => {
        setDataCities(data)
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch('/states.json')
      .then(response => response.json())
      .then(data => setDataStates(data.States))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch('/delivery.json')
      .then(response => response.json())
      .then(data => setDataDeliveryTypes(data.delivery))
      .catch(error => console.error(error));
  }, []);

  if(items.length == 0) return(
    <div style={{width: '100%', marginTop:'50px', textAlign: 'center'}}>
      <h1>Ви ще не додали товарів до корзини</h1>
      <h2><NavLink to="/devices">Повернутися до каталогу</NavLink></h2>
    </div>
  )
  return (
    <div className="checkoutPageContainer">
      {isLoading && <Loader />}
      <CheckoutForms
        handleFirstNameChange={handleFirstNameChange}
        handleSecondNameChange={handleSecondNameChange}
        handlePatronymicChange={handlePatronymicChange}
        handleEmailChange={handleEmailChange}
        handlePhoneNumberChange={handlePhoneNumberChange}
        dataCities={dataCities}
        delivery={delivery}
        handleDeliveryChange={handleDeliveryChange}
        city={city}
        postindex={postindex}
        handlePostindexChange={handlePostindexChange}
        data={data}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        handleCityChange={handleCityChange}
        dataStates={dataStates}
        setApartmentNumber={setApartmentNumber}
        setHouse={setHouse}
        setStreet={setStreet}
        paymentMethod={paymentMethod}
        handlePaymentMethodChange={handlePaymentMethodChange}
        errors={errors}
        dataDeliveryTypes={dataDeliveryTypes}
      />
      <UserCartDevicesList 
        delivery={delivery}
        isLoading={isLoading}
        handleOrderCreate={handleOrderCreate}
      />
    </div>
  )
  
})
 
export default observer(CheckoutPage);