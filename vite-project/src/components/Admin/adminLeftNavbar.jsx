import {React, useState} from 'react';
import '../../css/components/Admin/adminNav.css'
import { Col, Row, } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useMediaPredicate } from "react-media-hook";

const AdminLeftNavbar = () => {

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
  
  return (
    <div className='adminNavBg'>
      <Row>
        <Col xl={12}>
          <NavLink 
            to="/admin/orders" 
            className={"adminNavBtn"}
          >
            Замовлення
          </NavLink>
        </Col>
        <Col xl={12}>
          <NavLink 
            to="/admin/devices" 
            className={"adminNavBtn"}
          >
            Товари
          </NavLink>
        </Col>
        <Col xl={12}>
          <NavLink 
            to="/admin/messages" 
            className={"adminNavBtn"}
          >
            Повідомлення
          </NavLink>
        </Col>
        <Col xl={12}>
          <NavLink 
            to="/admin/reviews" 
            className={"adminNavBtn"}
          >
            Відгуки
          </NavLink>
        </Col>
        <Col xl={12}>
          <NavLink 
            to="/admin/clients" 
            className={"adminNavBtn"}
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