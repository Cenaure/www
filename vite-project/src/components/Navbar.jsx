import React, {useContext, useState} from 'react';
import { Context } from '../main.jsx';
import "../css/components/mainNav.css";
import "../css/components/button.css";
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AuthModal from "./authModal/index";
import RegModal from "./regModal/index";
import {motion, AnimatePresence} from "framer-motion";
import "../css/components/MyNavbar.css";

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
  /*
  return (
    <div>
      <nav className="navbar navbar-expand-lg mainNav">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mainNavNav">
              <li className="nav-item">
                <div className='dropdown-box'>
                  <a className="nav-link" href="/">Покупцям</a>
                  <div className='dropdown-content'>
                    <div className='container'>
                      <li>
                        1
                      </li>
                      <li>
                        2
                      </li>
                      <li>
                        3
                      </li>
                      <li>
                        4
                      </li>
                      <li>
                        5
                      </li>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Категорії</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Про нас</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contacts">Контакти</a>
              </li>
              <li>
                {user.isAuth ? (<>
                  <button className="button greenCol" onClick={() => navigate('/admin')}>Керування сайтом</button>
                  <button className="button greenCol" onClick={() => navigate('/acount')}>Акаунт</button></>)
                  : ( <>
                  <motion.button className="button greenCol"
                    onClick={() => (authModalOpen ? authClose() : authOpen())}
                  >Авторизація</motion.button>
                  <motion.button className="button greenCol"
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
  );*/
  return(
    <>
      <div className='MyNavbar'>
        <div className='navContent'>
          <div className='FLeft'>
            <div className='dropdown-box navItem'>
              <a className="nav-link" href="/">Покупцям</a>
              <div className='dropdown-content'>
                <div className='container'>
                  <div>
                    <button>
                      1
                    </button>
                  </div>
                  <div>
                    <button>
                      2
                    </button>
                  </div>
                  <div>
                    <button>
                      3
                    </button>
                  </div>
                  <div>
                    <button>
                      4
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <a className="nav-link active" aria-current="page" href="/">Категорії</a>
            <a className="nav-link" href="/">Про нас</a>
            <a className="nav-link" href="/contacts">Контакти</a>
          </div>
          <div className='FRight'>
            {user.isAuth ? (<>
              <button className="button greenCol" onClick={() => navigate('/admin')}>Керування сайтом</button>
              <button className="button greenCol" onClick={() => navigate('/acount')}>Акаунт</button></>)
              : ( <>
              <motion.button className="button greenCol"
                onClick={() => (authModalOpen ? authClose() : authOpen())}
              >Авторизація</motion.button>
              <motion.button className="button greenCol"
                onClick={() => (regModalOpen ? regClose() : regOpen())}
              >Реєстрація</motion.button></>)
            }
          </div>
        </div>
      </div>
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
    </>
  );
});
export default Navbar;
