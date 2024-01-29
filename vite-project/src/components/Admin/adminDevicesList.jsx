import React, { useState, useEffect, useImperativeHandle, useContext } from 'react';
import { useParams } from 'react-router-dom';
import DeviceCard from './deviceCard';
import { observer } from 'mobx-react-lite';
import { Context } from '../../main';

const AdminDevicesList = React.forwardRef(({handleCheckboxChange}, ref) => {
  const [loading, setLoading] = useState(true);
  const {id} = useParams()
  const [devices, setDevices] = useState({info: []});
  const {device} = useContext(Context);

  async function reloadDevices(id) {
    const data = device._devices
    const filteredData = id ? data.rows.filter(row => row.typeId === id) : data.rows;
    setDevices(filteredData)
    setLoading(false)
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
 
export default observer(AdminDevicesList);
