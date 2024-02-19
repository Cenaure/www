import React from 'react';
import '../../css/components/Admin/deviceCard.css'
import { Row, Col, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import editIcon from '../../assets/icons/edit.png'
const TypeCard = ({type, onCheckboxChange}) => {
  
  return(
    <NavLink to={`/admin/devices/type/${type._id}`} className="t">
      <div className="deviceCardContainer panel">
        <Row>
          <Col sm={12}>
            <div className="deviceCardLeftCol">
              <div className="deviceName"><span className="nowrap">{type.name}</span></div>
              <div className='elementsGrid'>
                <NavLink to={`update/${type._id}`}><Image src={editIcon} width={20}></Image></NavLink>
                <input type="checkbox" onClick={(e) => e.stopPropagation()} onChange={(e) => onCheckboxChange(type._id, e.target.checked)} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </NavLink>
  )
}
 
export default TypeCard;