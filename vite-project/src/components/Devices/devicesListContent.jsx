import React from 'react';
import '../../css/pages/deviceList.css'
import { Image, Badge, Collapse } from 'react-bootstrap'
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../main';
import cart from "../../css/imgs/cart.png" 
import heart from "../../css/imgs/heart.png" 
import scales from "../../css/imgs/scales.svg" 
import fetchOneType from '../../components/axios-components/types/fetchOneType';
import { NavLink } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import FiltersApply from './filtersApplyForm';
const DevicesList = () => {
  const {device} = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState();
  const [devices, setDevices] = useState({info: []});
  const {id} = useParams()
  const [loadingType, setLoadingType] = id ? useState(true) : useState(false);
  const lessThan1024 = useMediaPredicate('(max-width: 1024px)')
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [showFiltersApply, setShowFiltersApply] = useState(false);

  async function reloadDevices(id) {
    const data = device._devices
    setDevices(data.rows)
    if(id){
      setDevices(data.rows.filter(row => row.typeId === id))
      fetchOneType(id).then(data => {
        setType(data)
        setLoadingType(false)
      })
      console.log(type)
    }
    setLoading(false) 
  }

  async function filterProductsByAttributes(attributes) {
    const data = device._devices;
    let filteredDevices = data.rows;
  
    attributes.forEach(attribute => {
      filteredDevices = filteredDevices.filter(row => row.attributes.includes(attribute));
    });
  
    setDevices(filteredDevices);
    setLoading(false);
  }

  const handleCheckboxChange = (attributeName, value, isChecked) => {
    let newAttributes;
    if (isChecked) {
      newAttributes = [...selectedAttributes, {attributeName, value}];
    } else {
      newAttributes = selectedAttributes.filter(item => item.value !== value);
    }
    setSelectedAttributes(newAttributes);
    setShowFiltersApply(newAttributes.length > 0);
    console.log(showFiltersApply)
  }

  console.log(selectedAttributes)

  
  useEffect(() => {
    reloadDevices(id)
  }, [id])

  return (
    <div className="container-fluid mt-2 devicesContentContainer">
      <div className="devicesPageContainer">
        {!loadingType && <h1 className='mt-3 mb-4 typeName'>{type ? type.name : "Товари"}<Badge>{devices.length}</Badge></h1>}
        <div className="containerGrid">
          <div className="filtersContainer">
            {!lessThan1024 && type && !loadingType && type.attributes.map((attribute, index) => (
              <div key={index}>
                <p className="attributeItemName" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                  {attribute.name}
                  <span style={{transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'}}>▽</span>
                </p>
                <Collapse in={openIndex === index}>
                  <div>{attribute.values.map((value, index) => (
                    <div key={index} className='attributeValueContainer'>
                      <input type="checkbox" className='checkbox' onChange={(e) => handleCheckboxChange(attribute.name, value, e.target.checked)}/>{value}
                    </div>
                  ))}
                  {showFiltersApply && (
                        <FiltersApply count={selectedAttributes.length}/>
                      )}
                  </div>
                </Collapse>
              </div>
            ))}
          </div>
          <div>
            <div className="devicesGrid">
              {!loading && devices.map((device, index) => (
                <NavLink to={`/device/${device._id}`} style={{ textDecoration: 'none', color: 'inherit' }} key={index}>
                  <div className="deviceCard">
                    <div className='cardImageContainer'><Image src={import.meta.env.VITE_API_URL + device.imgs[0]}></Image></div>
                    <div className="deviceCardContent mt-1">
                      <p>{device.name}</p>
                      <div className="footer">
                        <h4 style={{margin: '0', color: 'rgb(234, 105, 69)'}}>{device.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}<span style={{fontSize: '22px'}}> ₴</span></h4>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                          <button onClick={(e) => e.preventDefault()}><Image src={scales}></Image></button>
                          <button onClick={(e) => e.preventDefault()}><Image src={heart}></Image></button>
                          <button className='cardBasketAdd' onClick={(e) => e.preventDefault()}><Image src={cart}></Image></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
 
export default DevicesList;