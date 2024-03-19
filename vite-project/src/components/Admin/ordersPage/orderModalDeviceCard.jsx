import React from 'react';
import '../../../css/components/Admin/deviceCard.css'
import { Row, Col, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
const OrderModalDeviceCard = ({device}) => {
  
  return(
    <NavLink to={`/device/${device._id}`} className="t orderModalDeviceCard">
      <div className="deviceCardContainer panel">
        <Row>
          <Col sm={1} xs={1} style={{height: "100%"}}>
            <Image src={import.meta.env.VITE_API_URL + '/' + device.imgs[0]} alt="image" style={{height: '100%'}}/>
          </Col>
          <Col sm={11} xs={11}>
            <div className="deviceCardLeftCol">
              <div className="deviceName"><span className="nowrap">{device.name}</span></div>
            </div>
          </Col>
        </Row>
      </div>
    </NavLink>
  )
}
 
export default OrderModalDeviceCard;