import React, { useState, useEffect, useContext} from 'react';
import '../../css/components/Admin/devicePageTypesList.css'
import '../../css/components/General/panel.css'
import { Row, Col, Form} from 'react-bootstrap';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';

const DevicePageTypesList = () => {
  const {type} = useContext(Context)
  const [types, setTypes] = useState({info: []});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const {id} = useParams()
  const [selectedType, setSelectedType] = useState(id && type._types.filter(t => t._id === id)[0]._id)

  useEffect(() => {
    setTypes(type._types)
    setLoading(false)
  }, [type._types]);

  useEffect(() => {
    if(id) setSelectedType(type._types.filter(t => t._id === id)[0]._id)
    else setSelectedType("")
  }, [id])

  useEffect(() => {
    if(selectedType) navigate(`/admin/devices/type/${selectedType}`)
    if(selectedType == "") navigate('/admin/devices')
  }, [selectedType])
 
  if(loading) return <></>
  return (
    <div className="devicePageTypesList mt-3">
      <Row>
        <Col xl={12}>
          <div style={{textAlign: "left"}}><h6 style={{color: 'grey'}} className='mt-1 mb-1'>Категорії</h6></div>
          
          {location.pathname != '/admin/devices' && <div style={{textAlign: 'left', textDecoration: 'underline'}} className='mb-1 mt-0'><Link to="/admin/devices">Очистити</Link></div>}
        </Col> 
        <Col xl={12}>
          <div>
            <Form.Select defaultValue={""} value={selectedType} 
            onChange={e => setSelectedType(e.target.value)} style={{width: '15rem'}}>
              <option value="">{ "Оберіть значення..." }</option>
              {!loading && types.map((type, index) => (
                <option value={type._id} key={index}>{type.name}</option>
              ))}
            </Form.Select>
          </div>
        </Col> 
      </Row>
    </div>
  )
}
 
export default observer(DevicePageTypesList);