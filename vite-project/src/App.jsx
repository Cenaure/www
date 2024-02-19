import React, { useContext, useEffect, useState } from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import "./css/components/container.css"
import { Context } from './main.jsx';  
import checkPost from './components/axios-components/user/checkPost.jsx';
import { observer } from 'mobx-react-lite';
import Loader from './components/loader.jsx';
import BasketComponent from './components/BasketComponent.jsx';

const App = observer(() => {
  const {user, device, type, brand, basket} = useContext(Context);
  const [loading, setLoading] = useState(true); 
  const [loadingDevices, setLoadingDevices] = useState(true); 
  const [loadingTypes, setLoadingTypes] = useState(true); 
  const [loadingBrands, setLoadingBrands] = useState(true); 
  const [loadingCart, setLoadingCart] = useState(true); 

  useEffect(() => {
    if(localStorage.getItem('token')) {
      checkPost().then((res) => {
        user.setUser(res.data.user);
        user.setIsAuth(true);
      }).finally(() => {
        setLoading(false)
        basket.updateBasket(user._user.id).then(() => setLoadingCart(false))
      })
    }
    else{
      setLoading(false)
    }
    device.updateDevices().then(() => setLoadingDevices(false))
    type.updateTypes().then(() => setLoadingTypes(false))
    brand.updateBrands().then(() => setLoadingBrands(false))
  }, [])

  if(loading || loadingDevices || loadingTypes || loadingBrands || loadingCart) return <Loader />

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
      <BasketComponent />
    </BrowserRouter>
  )
})

export default App
