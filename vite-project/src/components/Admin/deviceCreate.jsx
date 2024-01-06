import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Form } from 'react-bootstrap';
import '../../css/components/Admin/deviceCreatePage.css'
import fetchTypes from '../axios-components/fetchTypes';
import fetchOneType from '../axios-components/fetchOneType';
const DeviceCreate = () => {

  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [selectedTypeId, setSelectedTypeId] = useState()

  const [types, setTypes] = useState({info: []});
  const [selectedType, setSelectedType] = useState({info: []});
  const [loading, setLoading] = useState(true);
  const [loadingType, setLoadingType] = useState(true);

  useEffect(() => {
    fetchTypes()
      .then(data => {
        setTypes(data)
        setLoading(false)
      })
  }, []);

  useEffect(() => {
    if(selectedTypeId != "" && selectedTypeId != undefined){
      fetchOneType(selectedTypeId)
        .then(data => {
          setSelectedType(data)
          setLoadingType(false)
        })
    }
    else{
      setLoadingType(true)
    }
  }, [selectedTypeId]);

  
  return(
    <>
      <div className="devicesPageNav" style={{justifyContent: "right", padding: '10px'}}>
        <NavLink to="/admin/devices"><button className='myBtn createBtn'>Створити товар</button></NavLink>
      </div>
      <Row className='mt-2'>
        <Col xl={6}>
          <div className="form-floating mb-3 deviceCreateForm" data-bs-theme="light">
            <input type="text" className="form-control" placeholder="Назва" value={name} onChange={e => setName(e.target.value)}></input>
            <label htmlFor="floatingInput">Назва</label>
          </div>
        </Col>
        <Col xl={1}>
          <div className="form-floating mb-3 deviceCreateForm" data-bs-theme="light">
            <input type="text" className="form-control" placeholder="Ціна" value={price} onChange={e => setPrice(e.target.value)}></input>
            <label htmlFor="floatingInput">Ціна</label>
          </div>
        </Col>
        <Col xl={7} className='mt-3'>
          <Form.Group as={Col} controlId="formGridState" className='formOptions'>
            <Form.Label>Категорія</Form.Label>
            <Form.Select defaultValue="Оберіть категорію" onChange={e => setSelectedTypeId(e.target.value)}>
              <option value={""}>Оберіть категорію...</option>
              {!loading && types.map((type, index) => (
                <option value={type._id} key={index}>{type.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xl={6}>
          {!loadingType && selectedType.attributes.map((attribute) => (
            <p key={attribute._id}>{attribute.name}</p>
          ))}
        </Col>
      </Row>

    </>
  )
}
 
export default DeviceCreate;