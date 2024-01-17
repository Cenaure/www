import React, { useState, useEffect, useImperativeHandle } from 'react';
import fetchAllDevices from '../axios-components/fetchAllDevices';
import { useParams } from 'react-router-dom';
import DeviceCard from './deviceCard';

const AdminDevicesList = React.forwardRef(({handleCheckboxChange}, ref) => {
  const [loading, setLoading] = useState(true);
  const {id} = useParams()
  const [devices, setDevices] = useState({info: []});

  async function reloadDevices(id) {
    const data = fetchAllDevices(id)
      .then(data => {
        setDevices(data.rows)
        setLoading(false)
      });
  }

  useEffect(() => {
    reloadDevices(id)
  }, [id])

  useImperativeHandle(ref, () => ({
    reloadDevices: () => reloadDevices(id)
  }));

  if (loading) return(<></>)

  return (
    <div style={{marginTop: "20px"}}>
      {devices.map((device, index) => (
        <DeviceCard key={index} device={device} onCheckboxChange={handleCheckboxChange}/>
      ))}
    </div>
  )
});
 
export default AdminDevicesList;
