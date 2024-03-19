import React, { useContext } from 'react'
import "../css/components/dropdown.css"
import "../css/components/General/acountDropdown.css"
import { Nav } from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import { Context } from '../main.jsx';  
import logoutPost from './axios-components/user/logoutPost.jsx'
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const DropdownAcount = observer(({setDropdownAcountOpen, dropdownAcountOpen}) => {

  const context = useContext(Context);

  const navigate = useNavigate();
  const logout = () => {
    logoutPost(context, navigate).finally(() => {
      setDropdownAcountOpen(false);
    })
    
  }

  const variants = {
    open: { y: -20 },
    closed: { y: 0 },
  }

  return(
    <motion.div className="myDropdown acountDropdown"
        initial="closed"
        animate={dropdownAcountOpen ? "open" : "closed"}
        variants={variants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
      <div className='myDropdownContent'>
        <noscript><Link to="/acount">Налаштування</Link></noscript>
        <Nav.Link className='' onClick={() => logout()}>Вихід</Nav.Link>
      </div>
    </motion.div>
  );
})
 
export default DropdownAcount;