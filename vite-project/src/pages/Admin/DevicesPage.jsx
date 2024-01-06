import React from 'react';
import '../../css/components/Admin/page.css'
import "../../css/components/myBtn.css";
import DevicePageTypesList from '../../components/Admin/devicePageTypesList';
import { Col, Row } from 'react-bootstrap';
import { Routes, Route, NavLink } from 'react-router-dom';
import AdminDevicesList from '../../components/Admin/adminDevicesList';
const DevicesPage = () => {

  return (
    <div className='pageContainer'>
      <div className="devicesPageNav">
        <button className='myBtn createBtn'>Фільтри</button>
        <NavLink to="create"><button className='myBtn createBtn'>Створити товар</button></NavLink>
      </div>
      <Row>
        <Col xl={3}>
          <DevicePageTypesList />
        </Col>
        <Col xl={9}>
          <Routes>
            <Route path="/type/:id" element={<AdminDevicesList />} />
            <Route path="/" element={<AdminDevicesList />} />
          </Routes>
          
        </Col>
      </Row>
    </div>
  );
};

export default DevicesPage;