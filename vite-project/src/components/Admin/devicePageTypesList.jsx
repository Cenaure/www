import React, { useState, useEffect } from 'react';
import '../../css/components/Admin/devicePageTypesList.css'
import { Row, Col, Placeholder } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import fetchTypes from '../axios-components/fetchTypes';
const DevicePageTypesList = () => {
  
  const [types, setTypes] = useState({info: []});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTypes()
      .then(data => {
        setTypes(data)
        setLoading(false)
      })
  }, []);

  console.log(types)
  return (
    <div className="devicePageTypesList">
      <Row>
        <Col xl={12}>
          <div style={{textAlign: "center"}}><h3>Категорії</h3></div>
        </Col> 
        {!loading && types.map((type) => (
          <Col xl={12} key={type._id}>
            <NavLink to={`type/${type._id}`}><div className="listElement">{type.name}</div></NavLink>
          </Col> 
        ))}
        {loading &&
        <Col xl={12}>
          <NavLink><div className="listElement"><Placeholder xs={6} /></div></NavLink>
        </Col> }
      </Row>
    </div>
  )
}
 
export default DevicePageTypesList;