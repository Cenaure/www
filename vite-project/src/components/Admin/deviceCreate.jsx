import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Image } from 'react-bootstrap';
import '../../css/components/Admin/deviceCreatePage.css'
import '../../css/components/General/panel.css'
import fetchTypes from '../axios-components/types/fetchTypes';
import fetchOneType from '../axios-components/types/fetchOneType';
import fetchBrands from '../axios-components/brands/fetchBrands';
import { TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch';
import { useMediaPredicate } from "react-media-hook";
import deviceValidation from '../validation/deviceValidation';
import { useParams } from 'react-router-dom';
import { Context } from '../../main';
import { observable } from 'mobx';

const DeviceCreate = () => {

  const lessThan434 = useMediaPredicate('(max-width: 434px)')
  const [invClass, setInvClass] = useState({
    name: "form-control",
    price: "form-control",
    imgs: "form-control",
    category: "form-control",
    brand: "form-control",
  });
  const {device} = useContext(Context)
  const {id} = useParams()
  const [errors, setErrors] = useState({})
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [selectedTypeId, setSelectedTypeId] = useState('')
  const [selectedBrandId, setSelectedBrandId] = useState('')
  const [description, setDescription] = useState('')
  const [values, setValues] = observable(useState({}));
  const [imgs, setImgs] = useState({info: []});
  const [selectedImage, setSelectedImage] = useState('')

  const [types, setTypes] = useState({info: []});
  const [brands, setBrands] = useState({info: []});
  const [selectedType, setSelectedType] = useState({info: []});
  const [loading, setLoading] = useState(true);
  const [loadingType, setLoadingType] = useState(true);
  const [loadingBrands, setLoadingBrands] = useState(true);

  let navigate = useNavigate();

  const lessThan1200 = useMediaPredicate("(max-width: 1200px)");

  useEffect(() => {
    fetchTypes()
      .then(data => {
        setTypes(data)
        setLoading(false)
      })
  }, []);

  useEffect(() => {
    fetchBrands()
      .then(data => {
        setBrands(data)
        setLoadingBrands(false)
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
  
  const handleImageChange = e => {
    setImgs([...e.target.files])
    setSelectedImage(e.target.files[0])
  };

  const handleSubmit = async () => {
    
    let data = await deviceValidation(name, price, imgs, selectedTypeId, selectedBrandId, description, values, id)
    setErrors(data[0])
    console.log(data[0])
    setInvClass(data[1])
    if(Object.keys(data[0]).length === 0){
      await device.updateDevices()
      navigate("/admin/devices")
    }
  };
  console.log(values)
  useEffect(() => {
    if(id){
      let devices = device._devices.rows;
      let deviceById = devices.find(device => device._id === id);
      setName(deviceById.name)
      setPrice(deviceById.price)
      setDescription(deviceById.description)
      setImgs(deviceById.imgs)
      setSelectedImage(deviceById.imgs[0])
      setSelectedTypeId(deviceById.typeId)
      setSelectedBrandId(deviceById.brandId)
      setSelectedType(types[selectedTypeId])
      setValues(deviceById.attributes)
    }
  }, [id])
  return(
    <>
      <div className="devicesPageNav" style={{justifyContent: "right", padding: '10px'}}>
        <button className='myBtn createBtn' onClick={handleSubmit}>Зберегти товар</button>
      </div>
      <Row className='mt-2'>
        <Col xl={6} sm={9} xs={7} className={lessThan1200 ? "" : ""}>
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
        <Col xl={1} sm={3} xs={5} className={lessThan1200 ? "" : ""}>
          <div className="form-floating mb-3 deviceCreateForm" data-bs-theme="light">
            <input type="text" className={invClass.price} placeholder="Ціна" value={price} onChange={e => setPrice(e.target.value)}></input>
            <label htmlFor="floatingInput">Ціна</label>
          </div>
          {errors.price &&
            <p className="erText">
              {errors.price}
            </p>
          }
        </Col>
        <Col xl={5} xs={12} className={lessThan1200 ? "order-3 mt-3" : ""}>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Картинка товару</Form.Label>
            <Form.Control type="file" className={invClass.imgs} multiple onChange={handleImageChange}/>
          </Form.Group>
          {errors.imgs &&
              <p className="erText">
                {errors.imgs}
            </p>
          }
        </Col>
        <Col xl={4} md={6} xs={6} style={{height: '100px'}} className={lessThan1200 ? "" : ""}>
          <Form.Group as={Col} controlId="formGridState" className='formOptions'>
            <Form.Label>Категорія</Form.Label>
            <Form.Select value={selectedTypeId} className={invClass.category} onChange={e => {setSelectedTypeId(e.target.value), setValues({})}}>
              <option value="">{ "Оберіть категорію..." }</option>
              {!loading && types.map((type, index) => (
                <option value={type._id} key={index}>{type.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          {errors.category &&
            <p className="erText">
              {errors.category}
            </p>
          }
        </Col>
        <Col xl={3} md={6} xs={6} className={lessThan1200 ? "" : ""}>
          <Form.Group as={Col} controlId="formGridState" className='formOptions'>
            <Form.Label>Бренд</Form.Label>
            <Form.Select value={selectedBrandId} className={invClass.brand} onChange={e => setSelectedBrandId(e.target.value)}>
              <option value="">{ "Оберіть бренд..." }</option>
              {!loadingBrands && brands.map((brand, index) => (
                <option value={brand._id} key={index}>{brand.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          {errors.brand &&
            <p className="erText">
              {errors.brand}
            </p>
          }
        </Col>
        <Col xl={5} xs={12} style={{height: '100px'}} className={lessThan1200 ? "imageCol order-4" : ""}>
          {imgs.length > 0 && (
            <div className="imageContainer">
              <div>
                <TransformWrapper
                  defaultScale={1}
                  defaultPositionX={200}
                  defaultPositionY={100}
                >
                  {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                  <div style={{ position: 'relative'}}>
                    <div className="tools">
                      <button onClick={() => zoomIn()}>+</button>
                      <button onClick={() => zoomOut()}>−</button>
                      <button onClick={() => resetTransform()}>×</button>
                    </div>
                    <TransformComponent>
                      <div style={{maxWidth: "100%", height: lessThan1200 ? "30vh" : "50vh"}}><Image src={!id || imgs[0] instanceof File ? URL.createObjectURL(selectedImage) : import.meta.env.VITE_API_URL + '/' + selectedImage} alt="example" className="deviceImage"/></div>
                    </TransformComponent>
                  </div>)}
                </TransformWrapper>
              </div>
              {imgs.length > 1 && <div className="choiseImagesContainer">
                {!id || imgs[0] instanceof File ? imgs.map((image, index) => (
                  <Image
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`choice ${index}`}
                    onClick={() => setSelectedImage(image)}
                    fluid
                  />
                )) : imgs.map((image, index) => (
                  <Image
                    key={index}
                    src={import.meta.env.VITE_API_URL + '/' + image}
                    alt={`choice ${index}`}
                    onClick={() => setSelectedImage(image)}
                    fluid
                  />))}
              </div>}
            </div>
          )}
        </Col>
        <Col xl={7} xs={12} className={lessThan1200 ? "order-1" : ""}>
          {!loadingType && <div className={!lessThan434 ? "panel attributesPanel" : "attributesPanel"}>
            {selectedType.attributes.map((attribute, index) => (
              <div className="attributeElement" key={index}>
                <div className="attributeName">{attribute.name}</div>
                <Form.Select defaultValue={values[index] ? values[index].value : ""} 
                onChange={e => setValues({...values, [index]: {_id: !id ? attribute._id : values[index] ? values[index]._id : attribute._id, value: e.target.value}})} style={{width: '15rem'}}>
                  <option value="">{ "Оберіть значення..." }</option>
                  {attribute.values.map((value, index) => (
                    <option value={value} key={index}>{value}</option>
                  ))}
                </Form.Select>
              </div>
            ))} 
          </div>}
        </Col>
        <Col xl={7} xs={12} className={lessThan1200 ? "order-5 mb-5" : ""}>
          <Form.Group className="mt-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Опис товару</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)}/>
          </Form.Group>
        </Col>
      </Row>

    </>
  )
}
 
export default DeviceCreate;