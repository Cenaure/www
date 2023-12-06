import React from 'react'
import "../css/components/dropdown.css"
import "../css/components/acountDropdown.css"
import { Nav } from 'react-bootstrap'
const DropdownAcount = () => {
  
  return(
    <div className="myDropdown acountDropdown">
      <div className='myDropdownContent'>
        <Nav.Link href="/fdsf">Налаштування</Nav.Link>
        <Nav.Link href="#" className='mt-3'>Вихід</Nav.Link>
      </div>
    </div>
  );
}
 
export default DropdownAcount;