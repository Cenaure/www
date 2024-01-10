import React, { useState, useEffect } from 'react';
import '../../css/components/Admin/devicePageTypesList.css'
import '../../css/components/General/panel.css'
import { Row, Col, Spinner } from 'react-bootstrap';
import { NavLink, Link, useLocation } from 'react-router-dom';
import fetchTypes from '../axios-components/fetchTypes';
const DevicePageTypesList = () => {
  
  const [types, setTypes] = useState({info: []});
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetchTypes()
      .then(data => {
        setTypes(data)
        setLoading(false)
      })
  }, []);

  console.log(types)
  return (
    <div className="devicePageTypesList panel">
      <Row>
        <Col xl={12}>
          <div style={{textAlign: "center"}}><h3>Категорії</h3></div>
          {location.pathname != '/admin/devices/' && <div style={{textAlign: 'center', textDecoration: 'underline'}}><Link to="/admin/devices/">Очистити</Link></div>}
        </Col> 
        {!loading && types.map((type) => (
          <Col xl={12} key={type._id}>
            <NavLink to={`type/${type._id}`}><div className="listElement">{type.name}</div></NavLink>
          </Col> 
        ))}
        {loading &&
        <Col xl={12}>
          <div style={{width: '100%', display: 'flex', justifyContent: 'center', height: '20vh', alignItems: 'center'}}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </Col> }
      </Row>
    </div>
  )
}
 
export default DevicePageTypesList;