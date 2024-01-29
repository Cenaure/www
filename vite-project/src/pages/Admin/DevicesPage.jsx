import React, {useState, useRef} from 'react';
import '../../css/components/Admin/page.css'
import "../../css/components/myBtn.css";
import DevicePageTypesList from '../../components/Admin/devicePageTypesList';
import { Routes, Route, NavLink } from 'react-router-dom';
import AdminDevicesList from '../../components/Admin/adminDevicesList';
import { Row, Col } from 'react-bootstrap';
import devicesDelete from '../../components/axios-components/devices/devicesDelete';
const DevicesPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [devices, setDevices] = useState({info: []});
  const childComponentRef = useRef();
  const [selectedItems, setSelectedItems] = useState([]);
  const handleCheckboxChange = (itemId, isChecked) => {
    if (isChecked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== itemId));
    }
  }

  const handleClickDelete = () => {
    devicesDelete(selectedItems)
    childComponentRef.current.reloadDevices()
    setSelectedItems([])
  }
  return (
    <div className='pageContainer'>
      <div className="devicesPageNav">
        <button className='myBtn createBtn' onClick={() => setShowFilters(!showFilters)}>Фільтри</button>
        <button className='myBtn createBtn' onClick={handleClickDelete}>Видалити</button>
        <NavLink to="create"><button className='myBtn createBtn'>Створити товар</button></NavLink>
      </div>
      {showFilters && 
        <div className="filtersBlocks">
          <Row>
            <Col><DevicePageTypesList /></Col>
            <Col><DevicePageTypesList /></Col>
            <Col><DevicePageTypesList /></Col>
            <Col><DevicePageTypesList /></Col>
          </Row>
        </div>
      }
      <Routes>
        <Route path="/type/:id" element={<AdminDevicesList handleCheckboxChange={handleCheckboxChange} ref={childComponentRef}/>} />
        <Route path="/" element={<AdminDevicesList handleCheckboxChange={handleCheckboxChange} ref={childComponentRef}/>} />
      </Routes>
    </div>
  );
};

export default DevicesPage;