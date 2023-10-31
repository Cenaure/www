import React, {useContext} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import { Context } from './index';
import RegistrationModal from './components/RegistrationModal';

function App() {
  const {user} = useContext(Context);
  return (
    <BrowserRouter>
      {!user.isAuth ? <><AuthModal /><RegistrationModal /></> : <></>}
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;