import React from 'react';
import '../../css/pages/deviceList.css'
import DevicesList from '../../components/Devices/devicesListContent';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from '../PageNotFound';
const Devices = () => {

  return (
    <Routes>
      <Route path="/type/:id" element={<DevicesList />} />
      <Route path="/" element={<DevicesList />} />
      <Route path='*' element={<PageNotFound />}/>
    </Routes>
  )
}
 
export default Devices;