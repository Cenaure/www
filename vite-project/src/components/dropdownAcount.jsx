import React, { useContext } from 'react'
import "../css/components/dropdown.css"
import "../css/components/General/acountDropdown.css"
import { Nav } from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import { Context } from '../main.jsx';  
import logoutPost from './axios-components/logoutPost.jsx'
import { useNavigate, Link } from 'react-router-dom';

const DropdownAcount = observer(({setDropdownAcountOpen}) => {

  const context = useContext(Context);

  const navigate = useNavigate();
  const logout = () => {
    logoutPost(context, navigate).finally(() => {
      setDropdownAcountOpen(false);
    })
    
  }

  return(
    <div className="myDropdown acountDropdown">
      <div className='myDropdownContent'>
        <Link to="/acount">Налаштування</Link>
        <Nav.Link className='mt-3' onClick={() => logout()}>Вихід</Nav.Link>
      </div>
    </div>
  );
})
 
export default DropdownAcount;