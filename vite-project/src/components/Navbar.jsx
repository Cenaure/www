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
import { Container, Image } from 'react-bootstrap';
import { useMediaPredicate } from "react-media-hook";
import DropdownAcount from './dropdownAcount.jsx';
import { useNavigate, Link } from 'react-router-dom';
import cartIcon from '../css/imgs/cart.png'
import SearchElement from './SearchElement.jsx';

const Navbar = observer(() => {
  const {user, basket} = useContext(Context);
  
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [regModalOpen, setRegModalOpen] = useState(false);
  const [dropdownAcountOpen, setDropdownAcountOpen] = useState(false);
  const authClose = () => setAuthModalOpen(false);
  const regClose = () => setRegModalOpen(false);
  const authOpen = () => setAuthModalOpen(true);
  const regOpen = () => setRegModalOpen(true);
  const [search, setSearch] = useState('')

  const switchToReg = () => {
    authClose();
    regOpen();
  };

  const switchToAuth = () => {
    regClose();
    authOpen();
  };
  
  const lessThan768 = useMediaPredicate("(max-width: 768px)");
  
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
                {lessThan768 && <li>
                  {user.user.role == "ADMIN" && <button className='myBtn acountBtn' onClick={() => navigate('/admin')}>Панель управління</button>}
                </li>}
              </ul>
            </nav>
            {!user.isAuth ? <button onClick={() => (authModalOpen ? authClose() : authOpen())} className='myBtn'><img src={AcIm}/></button> : 
              <div>
                <button className='myBtn' onClick={() => basket.setOpen(!basket.isOpen)}><Image src={cartIcon} style={{height: '100%'}}></Image></button>
                {user.user.role == "ADMIN" && !lessThan768 && <button className='myBtn acountBtn' onClick={() => navigate('/admin')}>Панель управління</button>}
                <button className='myBtn acountBtn' onMouseEnter={() => setDropdownAcountOpen(true)} onMouseLeave={() => setDropdownAcountOpen(false)}>Акаунт
                  {dropdownAcountOpen && <DropdownAcount setDropdownAcountOpen={setDropdownAcountOpen}/>}
                </button>
              </div>
            }
            
            {lessThan768 &&
              <div className='burger' onClick={updateMenu}>
                <div className={burgerClass}></div>
                <div className={burgerClass}></div>
                <div className={burgerClass}></div>
              </div>}
          </div>
          <div className='botNav'>
            <form className='searchField'>
              <input type='text' placeholder='Я хочу знайти...' name='q' onChange={e => setSearch(e.target.value)}>
                
              </input>
              <button type='submit'>Ш</button>
            </form>
          </div>
          {!lessThan768 && <SearchElement search={search} setSearch={setSearch}/>}
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
