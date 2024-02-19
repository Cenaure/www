import React, { useState, useContext, useEffect } from 'react';
import '../../css/components/mainFilters.css'
import { Context } from '../../main';
import { Form } from 'react-bootstrap';
import DevicePageTypesList from '../Admin/devicePageTypesList';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
const MainFilters = ({onPriceChange, admin}) => {
  const [minPrice, setMinPrice] = useState(Number.MAX_VALUE);
  const [maxPrice, setMaxPrice] = useState(Number.MIN_VALUE);
  const {device} = useContext(Context)
  const {id} = useParams()
  

  useEffect(() => {
    let devices = device._devices.rows;
    let minValue = Number.MAX_VALUE;
    let maxValue = Number.MIN_VALUE;

    devices.forEach((device) => {
      if(device.price > maxValue){
        maxValue = device.price;
      }
      if(device.price < minValue){
        minValue = device.price;
      }
    });

    setMinPrice(minValue);
    setMaxPrice(maxValue);
  }, [device]);

  useEffect(() => {
    if(minPrice != Number.MAX_VALUE || maxPrice != Number.MIN_VALUE) {
      onPriceChange(minPrice, maxPrice)
      console.log(minPrice)
    }
  }, [minPrice, maxPrice, id])

  const handleKeyPress = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };
  
  return(
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <h6 className='nameOfFilter'>Ціна (грн)</h6>
      <div className='priceFilterContainer mb-2'>
        <div>
          <Form.Label htmlFor="inputMin">Від</Form.Label>
          <Form.Control type="text" id='inputMin' value={minPrice} onChange={(e) => {setMinPrice(e.target.value)}} onKeyPress={handleKeyPress}></Form.Control>
        </div>
        <div>
          <Form.Label htmlFor="inputMax">До</Form.Label>
          <Form.Control type="text" id='inputMax' value={maxPrice} onChange={(e) => {setMaxPrice(e.target.value)}} onKeyPress={handleKeyPress}></Form.Control>
        </div>
      </div>
      {admin && <DevicePageTypesList />}
    </div>
  )
}
 
export default observer(MainFilters);
