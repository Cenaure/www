import React, {useContext, useState} from 'react';
import { Context } from '../main.jsx';  
import "../css/components/button.css";
import { observer } from 'mobx-react-lite';
import AuthModal from "./authModal/index";
import RegModal from "./regModal/index";
import {AnimatePresence} from "framer-motion";
import AcIm from '../css/imgs/Account.png'
import "../css/components/myBtn.css";
import "../css/components/General/navbar.css";
import { Container } from 'react-bootstrap';
import { useMediaPredicate } from "react-media-hook";
import DropdownAcount from './dropdownAcount.jsx';
import { useNavigate, Link } from 'react-router-dom';


const Navbar = observer(() => {
  const {user} = useContext(Context);
  
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [regModalOpen, setRegModalOpen] = useState(false);
  const [dropdownAcountOpen, setDropdownAcountOpen] = useState(false);
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
  
  const lessThan700 = useMediaPredicate("(max-width: 700px)");
  
  const [burgerClass, setBurgerClass] = useState("line unclicked");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const updateMenu = () => {
    if(!isMenuClicked){
      setBurgerClass("line clicked");
      setMenuClass("menu visible");
    }
    else{
      setBurgerClass("line unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  }

  return(
    <>
      <header className='mynav'>
        <Container fluid>
          <div className='topNav'>
            <Link className='navBrand' to='/'>gigix</Link>
            <nav className={menuClass}>
              <ul className='navbar-links'>
                <li><a href='#'>Сервіси</a></li>
                <li><a href='#'>Сервіси</a></li>
                <li><a href='#'>Сервіси</a></li>
                {lessThan700 && <li>
                  <form className='searchField'>
                    <input type='text' placeholder='Я хочу знайти...' name='q'></input>
                    <button type='submit'>Ш</button>
                  </form>
                </li>}
              </ul>
            </nav>
            {!user.isAuth ? <button onClick={() => (authModalOpen ? authClose() : authOpen())} className='myBtn'><img src={AcIm}/></button> : 
              <div>
                {user.user.role == "ADMIN" && <button className='myBtn acountBtn' onClick={() => navigate('/admin')}>Панель управління</button>}
                <button className='myBtn acountBtn' onMouseEnter={() => setDropdownAcountOpen(true)} onMouseLeave={() => setDropdownAcountOpen(false)}>Акаунт
                  {dropdownAcountOpen && <DropdownAcount setDropdownAcountOpen={setDropdownAcountOpen}/>}
                </button>
              </div>
            }
            
            {lessThan700 &&
              <div className='burger' onClick={updateMenu}>
                <div className={burgerClass}></div>
                <div className={burgerClass}></div>
                <div className={burgerClass}></div>
              </div>}
          </div>
          {!lessThan700 && <div className='botNav'>
            <form className='searchField'>
              <input type='text' placeholder='Я хочу знайти...' name='q'>
                
              </input>
              <button type='submit'>Ш</button>
            </form>
          </div>}
        </Container>
      </header>
      
      <AnimatePresence
        initial={false}
        onExitComplete={() => null}
      >
        {authModalOpen && <AuthModal authModalOpen={authModalOpen} handleClose={authClose} switchToReg={switchToReg}/>}
      </AnimatePresence>
      <AnimatePresence
        initial={false}
        onExitComplete={() => null}
      >
        {regModalOpen && <RegModal regModalOpen={regModalOpen} handleClose={regClose} switchToAuth={switchToAuth}/>}
      </AnimatePresence>
    </>
  );
});
export default Navbar;
