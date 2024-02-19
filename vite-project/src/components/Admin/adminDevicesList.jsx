import React, { useState, useEffect, useImperativeHandle, useContext } from 'react';
import { useParams } from 'react-router-dom';
import DeviceCard from './deviceCard';
import { observer } from 'mobx-react-lite';
import { Context } from '../../main';
import '../../css/pages/adminDevicesList.css'
import MainFilters from '../Filters/MainFilters';
import { useMediaPredicate } from 'react-media-hook';
import { motion } from 'framer-motion';
import TablePagination from '@mui/material/TablePagination'

const AdminDevicesList = React.forwardRef(({handleCheckboxChange, show}, ref) => {

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const {id} = useParams()
  const {device} = useContext(Context);
  const [devices, setDevices] = useState({info: []})
  const [devicesWithoutPagination, setDevicesWithoutPagination] = useState({info: []})
  const [minPrice, setMinPrice] = useState(Number.MAX_VALUE)
  const [maxPrice, setMaxPrice] = useState(Number.MIN_VALUE)
  const lessThan1355 = useMediaPredicate("(max-width: 1355px)")
  const items = [...device._devices.rows];
  const filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  async function reloadDevices(id, minPrice, maxPrice) {
    setLoading(true);
    let filteredData = id ? filteredItems.filter(row => row.typeId === id) : filteredItems
    if (minPrice !== undefined && maxPrice !== undefined) {
        filteredData = filteredData.filter(device => device.price >= minPrice && device.price <= maxPrice)
    }
    const indexOfLastDevice = (currentPage + 1) * rowsPerPage
    const indexOfFirstDevice = indexOfLastDevice - rowsPerPage
    setDevices(filteredData.slice(indexOfFirstDevice, indexOfLastDevice))
    setDevicesWithoutPagination(filteredData)
    setLoading(false)
  }
  
  const handlePriceChange = (newMinPrice, newMaxPrice) => {
    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
    reloadDevices(id, newMinPrice, newMaxPrice)
  };

  useEffect(() => {
    const indexOfLastDevice = (currentPage + 1) * rowsPerPage
    const indexOfFirstDevice = indexOfLastDevice - rowsPerPage
    setDevices(device._devices.rows.slice(indexOfFirstDevice, indexOfLastDevice))
  }, [currentPage, device._devices, rowsPerPage])

  useEffect(() => {
    reloadDevices(id, minPrice, maxPrice)
  }, [device._devices, minPrice, maxPrice, search, currentPage])

  useImperativeHandle(ref, () => ({
    reloadDevices: () => reloadDevices(id, minPrice, maxPrice)
  }));

  if (loading) return(<></>)

  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0); 
  }

  return (
    <div className="devicesPageFiltersAndDevicesGrid">
      {!lessThan1355 && <div className="panel mt-2">
        <MainFilters onPriceChange={handlePriceChange} admin={true}/>
      </div>}
      {lessThan1355 &&
        <motion.div className={show ? "visible modalFilters" : "modalFilters"}
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={variants}><MainFilters onPriceChange={handlePriceChange} admin={true}/></motion.div>
      }
      <div className="">
        <div className="paginationContainer mt-1">
          <form className='searchField'>
            <input type='text' placeholder='Я хочу знайти...' name='q' onChange={e => setSearch(e.target.value)}>
              
            </input>
            <button type='submit'>Ш</button>
          </form>
          <TablePagination
            component="div"
            count={devicesWithoutPagination.length}
            page={currentPage}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={'Товарів на сторінці:'}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} з ${count !== -1 ? count : `більш за ${to}`}`}
          />
        </div>
        {devices?.map((device, index) => (
          <DeviceCard key={index} device={device} onCheckboxChange={handleCheckboxChange}/>
        ))}
        <div className="paginationContainer">
          <TablePagination
            component="div"
            count={devicesWithoutPagination.length}
            page={currentPage}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={'Товарів на сторінці:'}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} з ${count !== -1 ? count : `більш за ${to}`}`}
          />
        </div>
      </div>
    </div>
  )
});

export default observer(AdminDevicesList);
