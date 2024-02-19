import {React, useState} from 'react';
import '../../css/components/Admin/adminNav.css'
import { Col, Row, } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useMediaPredicate } from "react-media-hook";

const AdminLeftNavbar = () => {

  const lessThan700 = useMediaPredicate("(max-width: 768px)");

  const [burgerClass, setBurgerClass] = useState("line unclicked");
  const [menuClass, setMenuClass] = useState("adminMenu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const updateMenu = () => {
    if(!isMenuClicked){
      setBurgerClass("line clicked");
      setMenuClass("adminMenu visible");
    }
    else{
      setBurgerClass("line unclicked");
      setMenuClass("adminMenu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  }
  
  return (
    <div className='adminNavBg'>
      <Row className={menuClass}>
        <Col xl={12}>
          <NavLink 
            to="/admin/orders" 
            className={"adminNavBtn"}
            onClick={updateMenu}
          >
            Замовлення
          </NavLink>
        </Col>
        <Col xl={12}>
          <NavLink 
            to="/admin/devices" 
            className={"adminNavBtn"}
            onClick={updateMenu}
          >
            Товари
          </NavLink>
        </Col> 
        <Col xl={12}>
          <NavLink 
            to="/admin/categories" 
            className={"adminNavBtn"}
            onClick={updateMenu}
          >
            Категорії
          </NavLink>
        </Col>
        <Col xl={12}>
          <NavLink 
            to="/admin/brands" 
            className={"adminNavBtn"}
            onClick={updateMenu}
          >
            Бренди
          </NavLink>
        </Col>
        <Col xl={12}>
          <NavLink 
            to="/admin/messages" 
            className={"adminNavBtn"}
            onClick={updateMenu}
          >
            Повідомлення
          </NavLink>
        </Col>
        <Col xl={12}>
          <NavLink 
            to="/admin/reviews" 
            className={"adminNavBtn"}
            onClick={updateMenu}
          >
            Відгуки
          </NavLink>
        </Col>
        <Col xl={12}>
          <NavLink 
            to="/admin/clients" 
            className={"adminNavBtn"}
            onClick={updateMenu}
          >
            Кліенти
          </NavLink>
        </Col>
      </Row>
      {lessThan700 &&
      <div className='burger' onClick={updateMenu}>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
      </div>}
    </div>
  );
}
 
export default AdminLeftNavbar;