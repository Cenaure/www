import React, {useState, useRef, useContext} from 'react';
import '../../css/components/Admin/page.css'
import "../../css/components/myBtn.css";
import { Routes, Route, NavLink } from 'react-router-dom';
import AdminDevicesList from '../../components/Admin/adminDevicesList';
import devicesDelete from '../../components/axios-components/devices/devicesDelete';
import { Context } from '../../main';
import PageNotFound from '../PageNotFound';
import { useMediaPredicate } from 'react-media-hook';
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const DevicesPage = () => {
  const [show, setShow] = useState(false)
  const [showFilters, setShowFilters] = useState(false);
  const {device} = useContext(Context);
  const lessThan1355 = useMediaPredicate('(max-width: 1355px)')
  const childComponentRef = useRef();
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (itemId, isChecked) => {
    if (isChecked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== itemId));
    }
  }

  const handleClickDelete = async () => {
    let data = await devicesDelete(selectedItems)
    if(data.deletedCount !== 0){
      device.updateDevices()
      childComponentRef.current.reloadDevices()
      setShow(true)
      setTimeout(() => {
        setShow(false);
      }, 2000);
    }
  }

  const variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className='pageContainer'>
      <div className="devicesPageNav deviceslist">
        {lessThan1355 && <button className='myBtn createBtn' onClick={() => setShowFilters(!showFilters)}>Фільтри</button>}
        <button className='myBtn createBtn' onClick={handleClickDelete}>Видалити
          <motion.div 
              className={show ? "visible alertContainer" : "alertContainer"}
              initial="hidden"
              animate={show ? "visible" : "hidden"}
              variants={variants}
              transition={{  type: "spring", stiffness: 100, duration: 0.1 }}
          >
              <Alert severity="success">
                  Товари успішно видалені
              </Alert>
          </motion.div>
        </button>
        <NavLink to="create"><button className='myBtn createBtn'>Створити товар</button></NavLink>
      </div>
      <Routes>
        {!loading && <Route path="/type/:id" element={<AdminDevicesList handleCheckboxChange={handleCheckboxChange} ref={childComponentRef} show={showFilters}/>} />}
        {!loading && <Route path="/" element={<AdminDevicesList handleCheckboxChange={handleCheckboxChange} ref={childComponentRef} show={showFilters}/>} />}
        {!loading && <Route path="*" element={<PageNotFound />}/>}
      </Routes>
    </div>
  );
};

export default DevicesPage;