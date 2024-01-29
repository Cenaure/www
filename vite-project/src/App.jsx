import React, { useContext, useEffect, useState } from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import {Container} from 'react-bootstrap';
import "./css/components/container.css"
import { Context } from './main.jsx';  
import checkPost from './components/axios-components/user/checkPost.jsx';
import { observer } from 'mobx-react-lite';
import Loader from './components/loader.jsx';
import fetchAllDevices from './components/axios-components/devices/fetchAllDevices.jsx'
const App = observer(() => {
  const {user, device} = useContext(Context);
  const [loading, setLoading] = useState(true); 
  const [loadingDevices, setLoadingDevices] = useState(true); 

  useEffect(() => {
    if(localStorage.getItem('token')) {
      checkPost().then((res) => {
        user.setUser(res.data.user);
        user.setIsAuth(true);
      }).finally(() => setLoading(false))
    }
    else{
      setLoading(false)
    }
    fetchAllDevices().then((data) => {
      device.setDevices(data)
    }).finally(setLoadingDevices(false))
  }, [])

  if(loading || loadingDevices) return <Loader />

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  )
})

export default App
