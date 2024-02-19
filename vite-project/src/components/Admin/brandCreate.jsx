import { observer } from 'mobx-react-lite';
import React, {useContext, useState} from 'react';
import { Row, Col } from 'react-bootstrap';
import { Context } from '../../main';
import brandValidation from '../validation/brandValidation';

const BrandCreate = ({onClose, brandToUpdate, setShowCreateModal}) => {

  const [invClass, setInvClass] = useState({
    name: "form-control",
  });
  const {brand} = useContext(Context)
  const [errors, setErrors] = useState({})

  const [name, setName] = useState(brandToUpdate ? brandToUpdate.name : '')
  
  const handleSubmit = async () => {
    let data = await brandValidation(name, brandToUpdate && brandToUpdate._id)
    setErrors(data[0])
    setInvClass(data[1])
    if(Object.keys(data[0]).length === 0){
      await brand.updateBrands()
      setShowCreateModal ? setShowCreateModal(false) : onClose()
    }
  };

  return(
    <Row className='mt-4'>
      <Col sm={12} xs={12}>
        <div className="form-floating mb-3 deviceCreateForm" data-bs-theme="light">
          <input type="text" className={invClass.name} placeholder="Назва" value={name} onChange={e => setName(e.target.value)}></input>
          <label htmlFor="floatingInput">Назва</label>
        </div>
        {errors.name &&
          <p className="erText">
            {errors.name}
          </p>
        }
      </Col>
      <Col style={{display: 'flex', justifyContent: 'space-between'}}>
        <button className='myBtn createBtn' onClick={handleSubmit}>{brandToUpdate ? "Зберегти" : "Створити бренд"}</button>
        {brandToUpdate && <button className='myBtn createBtn' onClick={onClose}>Закрити</button>}
      </Col>
    </Row>
  )
}
 
export default observer(BrandCreate);