import React, { useContext, useEffect, useState } from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import {Container} from 'react-bootstrap';
import "./css/components/container.css"
import { Context } from './main.jsx';  
import checkPost from './components/axios-components/checkPost.jsx';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if(localStorage.getItem('token')) {
      checkPost().then(() => {
        user.setUser(user);
        user.setIsAuth(true);
      }).finally(() => setLoading(false))
    }
  }, [])

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
