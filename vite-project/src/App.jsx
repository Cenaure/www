import React, { useContext, useEffect, useState } from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import {Container} from 'react-bootstrap';
import "./css/components/container.css"
import { Context } from './main.jsx';  
import checkPost from './components/axios-components/checkPost.jsx';
import { observer } from 'mobx-react-lite';
import Loader from './components/loader.jsx';

const App = observer(() => {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if(localStorage.getItem('token')) {
      checkPost().then((res) => {
        console.log(res);
        user.setUser(res.data.user);
        user.setIsAuth(true);
      }).finally(() => setLoading(false))
    }
    else{
      setLoading(false)
    }
  }, [])

  if(loading) return <Loader />

  return (
    <BrowserRouter>
      <Navbar />
      <Container fluid>
        <AppRouter />
      </Container>
    </BrowserRouter>
  )
})

export default App
