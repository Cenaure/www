import React from 'react';
import '../../css/components/Admin/deviceCard.css'
import { Row, Col, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
const SearchResultItem = ({device}) => {
  
  return(
    <NavLink to={`/device/${device._id}`} className="t">
      <div className="deviceCardContainer panel searchItem">
        <Row>
          <Col sm={2} xs={2} style={{height: "100%"}}>
            <Image src={import.meta.env.VITE_API_URL + '/' + device.imgs[0]} alt="image" style={{height: '40px'}}/>
          </Col>
          <Col sm={10} xs={10}>
            <div className="deviceCardLeftCol">
              <div className="deviceName"><span className="nowrap">{device.name}</span></div>
            </div>
          </Col>
        </Row>
      </div>
    </NavLink>
  )
}
 
export default SearchResultItem;