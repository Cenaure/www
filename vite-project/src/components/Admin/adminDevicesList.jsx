import React, { useState, useEffect } from 'react';
import fetchAllDevices from '../axios-components/fetchAllDevices';
import { useParams } from 'react-router-dom';

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
    <div className="">
      {devices.map((device, index) => (
        <p key={index}>{device.name}</p>
      ))}
    </div>
  )
}
 
export default AdminDevicesList;