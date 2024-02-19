import React from 'react';
import '../../css/pages/deviceList.css'
import { Image, Badge, Collapse } from 'react-bootstrap'
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../main';
import { useMediaPredicate } from 'react-media-hook';
import FiltersApply from './filtersApplyForm';
import DeviceItem from './deviceItem';
import { observer } from 'mobx-react-lite';
import MainFilters from '../Filters/MainFilters';
import Pagination from '@mui/material/Pagination'

const DevicesList = () => {
  const navigate = useNavigate()
  const {device, type, user, basket} = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [typeById, setTypeById] = useState();
  const [devices, setDevices] = useState({info: []});
  const {id} = useParams()
  const [loadingType, setLoadingType] = id ? useState(true) : useState(false);
  const lessThan1024 = useMediaPredicate('(max-width: 1024px)')
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [showFiltersApply, setShowFiltersApply] = useState(false);
  const [minPrice, setMinPrice] = useState(Number.MAX_VALUE);
  const [maxPrice, setMaxPrice] = useState(Number.MIN_VALUE); 
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(24)
  const [devicesWithoutPagination, setDevicesWithoutPagination] = useState({info: []})
  async function reloadDevices(id, minPrice, maxPrice) {
    setLoading(true);
    let filteredData = id ? device._devices.rows.filter(row => row.typeId === id) : device._devices.rows;
    if (minPrice !== undefined && maxPrice !== undefined) {
      filteredData = filteredData.filter(device => device.price >= minPrice && device.price <= maxPrice);
      if(selectedAttributes){
        const groupedAttributes = selectedAttributes.reduce((acc, curr) => {
          if (!acc[curr.name]) {
              acc[curr.name] = [];
          }
          acc[curr.name].push(curr.value);
          return acc;
        }, {})  
        filteredData = filteredData.filter(device =>
          Object.keys(groupedAttributes).every(attributeName =>
              groupedAttributes[attributeName].some(value =>
                  device.attributes.some(
                      productAttribute =>
                          productAttribute.name == attributeName &&
                          productAttribute.value == value
                  )
              )
          )
        )
      }
    }
    const indexOfLastDevice = currentPage * rowsPerPage
    const indexOfFirstDevice = indexOfLastDevice - rowsPerPage
    setDevices(filteredData.slice(indexOfFirstDevice, indexOfLastDevice))
    setDevicesWithoutPagination(filteredData)
    setLoading(false)
    setLoadingType(false)
  }

  const filterProductsByAttributes = () => {
    reloadDevices(id, minPrice, maxPrice)
  }

  useEffect(() => {
    const indexOfLastDevice = currentPage * rowsPerPage
    const indexOfFirstDevice = indexOfLastDevice - rowsPerPage
    setDevices(device._devices.rows.slice(indexOfFirstDevice, indexOfLastDevice))
  }, [currentPage, device._devices, rowsPerPage])

  useEffect(() => {
    setTypeById(id && type._types.find(t => t._id === id))
  }, [id])

  const handleCheckboxChange = (attributeName, value, isChecked) => {
    let newAttributes;
    if (isChecked) {
      newAttributes = [...selectedAttributes, {name: attributeName, value: value}];
    } else {
      newAttributes = selectedAttributes.filter(item => item.value !== value);
    }
    setSelectedAttributes(newAttributes);
    setShowFiltersApply(newAttributes.length > 0);
  }

  useEffect(() => {
    reloadDevices(id)
  }, [id])

  const handlePriceChange = (newMinPrice, newMaxPrice) => {
    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
    reloadDevices(id, newMinPrice, newMaxPrice)
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <div className="container-fluid mt-2 devicesContentContainer">
      <div className="devicesPageContainer">
        {!loadingType && <h1 className='mt-3 mb-2 typeName'>{typeById ? typeById.name : "Товари"}<Badge>{devices.length}</Badge></h1>}
        {!id && 
          <div className="gridContainer">
            <div className="typesGrid">
              {type._types.map((type, index) => (
                <div className="panel typeElement" key={index} onClick={() => navigate(`type/${type._id}`)}>{type.name}</div>
              ))}
            </div>   
          </div>
        }
        <div className="devicesNav">
          {showFiltersApply && (
            <div className='mb-2'>
              <FiltersApply count={selectedAttributes.length} filterProductsByAttributes={filterProductsByAttributes}/>
            </div>
          )}
        </div>
        <div className="containerGrid">
          <div className="filtersContainer">
            <div className="mainFiltersContainer">
              <MainFilters onPriceChange={handlePriceChange} admin={false}></MainFilters>
            </div>
            {!lessThan1024 && typeById && !loadingType && typeById.attributes.map((attribute, index) => (
              <div key={index}>
                <p className="attributeItemName" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                  {attribute.name}
                  <span style={{transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'}}>▽</span>
                </p>
                <Collapse in={openIndex === index}>
                  <div className='attributeAndFilterApplyPanel' id='collapseContainer'>
                    <div>
                      {attribute.values.map((value, index) => (
                        <div key={index} className='attributeValueContainer'>
                          <input type="checkbox" className='checkbox' onChange={(e) => {handleCheckboxChange(attribute.name, value, e.target.checked)}}/>{value}
                        </div>
                      ))}
                    </div>
                  </div>
                </Collapse>
              </div>
            ))}
          </div>
          <div>
            <div className="devicesGrid">
              {!loading && devices.map((device, index) => (
                <DeviceItem device={device} index={index} userId={user._user.id} basket={basket}/>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="paginationContainer">
        <Pagination
          count={10/*Math.ceil(devicesWithoutPagination.length / rowsPerPage)*/}
          page={currentPage}
          onChange={handleChangePage}
        />
      </div>
    </div>
  )
}
 
export default observer(DevicesList);