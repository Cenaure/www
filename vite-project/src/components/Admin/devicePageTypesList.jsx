import React, { useState, useEffect} from 'react';
import '../../css/components/Admin/devicePageTypesList.css'
import '../../css/components/General/panel.css'
import { Row, Col} from 'react-bootstrap';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import fetchTypes from '../axios-components/fetchTypes';
import { motion } from 'framer-motion';

const DevicePageTypesList = () => {
  
  const [types, setTypes] = useState({info: []});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTypes()
      .then(data => {
        setTypes(data)
        setLoading(false)
      })
  }, []);

  if(loading) return <></>

  return (
    <motion.div className="devicePageTypesList panel" initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 0.2 }}>
      <Row>
        <Col xl={12}>
          <div style={{textAlign: "center"}}><h3>Категорії</h3></div>
          {location.pathname != '/admin/devices' && <div style={{textAlign: 'center', textDecoration: 'underline'}}><Link to="/admin/devices">Очистити</Link></div>}
        </Col> 
        {!loading && types.map((type) => (
          <Col xl={12} key={type._id}>
            <NavLink to={`type/${type._id}`}><div className="listElement">{type.name}</div></NavLink>
          </Col> 
        ))}
        <Col xl={12}>
          <div style={{display: 'flex', width: '100%', justifyContent: 'center', marginTop: '20px'}}>
            <button className='myBtn createBtn' onClick={() => navigate('/admin/types/create')}>Створити категорію</button>
          </div>
        </Col>
      </Row>
    </motion.div>
  )
}
 
export default DevicePageTypesList;