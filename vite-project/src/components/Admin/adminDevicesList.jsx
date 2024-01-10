import React, { useState, useEffect } from 'react';
import fetchAllDevices from '../axios-components/fetchAllDevices';
import { useParams } from 'react-router-dom';
import DeviceCard from './deviceCard';

const AdminDevicesList = () => {

  const [devices, setDevices] = useState({info: []});
  const [loading, setLoading] = useState(true);
  const {id} = useParams()

  useEffect(() => {
    fetchAllDevices(id)
      .then(data => {
        setDevices(data.rows)
        setLoading(false)
      })
  }, [id]);

  console.log(devices)

  if (loading) return(<></>)

  return (
    <div style={{marginTop: "20px"}}>
      {devices.map((device, index) => (
        <DeviceCard key={index} device={device}/>
      ))}
    </div>
  )
}
 
export default AdminDevicesList;