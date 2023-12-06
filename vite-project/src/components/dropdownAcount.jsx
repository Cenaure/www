import React, { useContext } from 'react'
import "../css/components/dropdown.css"
import "../css/components/acountDropdown.css"
import { Nav } from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import { Context } from '../main.jsx';  
import logoutPost from './axios-components/logoutPost.jsx'
import { useNavigate } from 'react-router-dom';

const DropdownAcount = observer(() => {

  const context = useContext(Context);
  const navigate = useNavigate();
  const logout = () => {
    logoutPost(context).finally(() => navigate('/'))
  }

  return(
    <div className="myDropdown acountDropdown">
      <div className='myDropdownContent'>
        <Nav.Link href="/acount">Налаштування</Nav.Link>
        <Nav.Link className='mt-3' onClick={() => logout()}>Вихід</Nav.Link>
      </div>
    </div>
  );
})
 
export default DropdownAcount;