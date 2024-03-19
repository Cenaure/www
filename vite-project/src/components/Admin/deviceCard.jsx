import React from 'react';
import '../../css/components/Admin/deviceCard.css'
import { Row, Col, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import editIcon from '../../assets/icons/edit.png'
const DeviceCard = ({device, onCheckboxChange}) => {
  
  return(
    <NavLink to={`/device/${device._id}`} className="t">
      <div className="deviceCardContainer panel">
        <Row>
          <Col sm={2} xs={2} style={{height: "100%"}}>
            <Image src={import.meta.env.VITE_API_URL + '/' + device.imgs[0]} alt="image" style={{height: '100%'}}/>
          </Col>
          <Col sm={10} xs={10}>
            <div className="deviceCardLeftCol">
              <div className="deviceName"><span className="nowrap">{device.name}</span></div>
              <div className='elementsGrid'>
                <NavLink to={`/admin/devices/update/${device._id}`}><Image src={editIcon} width={20}></Image></NavLink>
                <input type="checkbox" onClick={(e) => e.stopPropagation()} onChange={(e) => onCheckboxChange(device._id, e.target.checked)} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </NavLink>
  )
}
 
export default DeviceCard;