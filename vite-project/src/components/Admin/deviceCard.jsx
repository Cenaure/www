import React from 'react';
import '../../css/components/Admin/deviceCard.css'
import { Row, Col, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const DeviceCard = ({device}) => {


  return(
    <NavLink to={`/device/${device._id}`} className="t">
      <div className="deviceCardContainer panel">
        <Row>
          <Col sm={2} style={{height: "100%"}}>
            <Image src={import.meta.env.VITE_API_URL + '/' + device.imgs[0]} alt="image" style={{height: '100%'}}/>
          </Col>
          <Col sm={10}>
            {device.name}
          </Col>
        </Row>
      </div>
    </NavLink>
  )
}
 
export default DeviceCard;