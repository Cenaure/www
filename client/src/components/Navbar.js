import React, {useContext, useState} from 'react';
import { Context } from '..';
import "../css/mainNav.css";
import "../css/button.css";
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AuthModal from "./authModal/index";
import RegModal from "./regModal/index";
import {motion, AnimatePresence} from "framer-motion";

const Navbar = observer(() => {
  const {user} = useContext(Context);
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [regModalOpen, setRegModalOpen] = useState(false);
  const authClose = () => setAuthModalOpen(false);
  const regClose = () => setRegModalOpen(false);
  const authOpen = () => setAuthModalOpen(true);
  const regOpen = () => setRegModalOpen(true);

  const switchToReg = () => {
    authClose();
    regOpen();
  };

  const switchToAuth = () => {
    regClose();
    authOpen();
  };
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mainNav">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Магазин</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Головна</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Категорії</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Про нас</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contacts">Контакти</a>
              </li>
              <li>
                {user.isAuth ? (<>
                  <button className="button" onClick={() => navigate('/admin')}>Керування сайтом</button>
                  <button className="button" onClick={() => navigate('/acount')}>Акаунт</button></>)
                  : ( <>
                  <motion.button className="button"
                    onClick={() => (authModalOpen ? authClose() : authOpen())}
                  >Авторизація</motion.button>
                  <motion.button className="button"
                    onClick={() => (regModalOpen ? regClose() : regOpen())}
                  >Реєстрація</motion.button></>)
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <AnimatePresence
        initial={false}
        onExitComplete={() => null}
      >
        {authModalOpen && <AuthModal authModalOpen={authModalOpen} handleClose={authClose} switchToReg={switchToReg} />}
      </AnimatePresence>
      <AnimatePresence
        initial={false}
        onExitComplete={() => null}
      >
        {regModalOpen && <RegModal regModalOpen={regModalOpen} handleClose={regClose} switchToAuth={switchToAuth} />}
      </AnimatePresence>
    </div>
  );
});
export default Navbar;
