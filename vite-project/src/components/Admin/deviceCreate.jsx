import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Form, Image } from 'react-bootstrap';
import '../../css/components/Admin/deviceCreatePage.css'
import '../../css/components/General/panel.css'
import fetchTypes from '../axios-components/fetchTypes';
import fetchOneType from '../axios-components/fetchOneType';
import fetchBrands from '../axios-components/fetchBrands';
import { TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch';
import createDevice from '../axios-components/createDevice';
import { useMediaPredicate } from "react-media-hook";

const DeviceCreate = () => {

  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [selectedTypeId, setSelectedTypeId] = useState()
  const [selectedBrandId, setSelectedBrandId] = useState()
  const [description, setDescription] = useState()
  const [values, setValues] = useState({});
  const [imgs, setImgs] = useState([]);
  const [selectedImage, setSelectedImage] = useState();

  const [order, setOrder] = useState("order-1");

  const [types, setTypes] = useState({info: []});
  const [brands, setBrands] = useState({info: []});
  const [selectedType, setSelectedType] = useState({info: []});
  const [loading, setLoading] = useState(true);
  const [loadingType, setLoadingType] = useState(true);
  const [loadingBrands, setLoadingBrands] = useState(true);

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
    setImgs([...e.target.files]);
    setSelectedImage(e.target.files[0])
  };

  return(
    <>
      <div className="devicesPageNav" style={{justifyContent: "right", padding: '10px'}}>
        <button className='myBtn createBtn' onClick={() => createDevice(name, price, imgs, selectedTypeId, selectedBrandId, description, values)}>Зберегти товар</button>
      </div>
      <Row className='mt-2'>
        <Col xl={6} sm={9} xs={8} className={lessThan1200 ? "" : ""}>
          <div className="form-floating mb-3 deviceCreateForm" data-bs-theme="light">
            <input type="text" className="form-control" placeholder="Назва" value={name} onChange={e => setName(e.target.value)}></input>
            <label htmlFor="floatingInput">Назва</label>
          </div>
        </Col>
        <Col xl={1} sm={3} xs={4} className={lessThan1200 ? "" : ""}>
          <div className="form-floating mb-3 deviceCreateForm" data-bs-theme="light">
            <input type="text" className="form-control" placeholder="Ціна" value={price} onChange={e => setPrice(e.target.value)}></input>
            <label htmlFor="floatingInput">Ціна</label>
          </div>
        </Col>
        <Col xl={5} className={lessThan1200 ? "order-3 mt-3" : ""}>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Картинка товару</Form.Label>
            <Form.Control type="file" multiple onChange={handleImageChange}/>
          </Form.Group>
        </Col>
        <Col xl={4} md={6} xs={7} style={{height: '100px'}} className={lessThan1200 ? "" : ""}>
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
        <Col xl={3} md={6} xs={5} className={lessThan1200 ? "" : ""}>
          <Form.Group as={Col} controlId="formGridState" className='formOptions'>
            <Form.Label>Бренд</Form.Label>
            <Form.Select defaultValue="Оберіть категорію" onChange={e => setSelectedBrandId(e.target.value)}>
              <option value={""}>Оберіть бренд...</option>
              {!loadingBrands && brands.map((brand, index) => (
                <option value={brand._id} key={index}>{brand.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xl={5} style={{height: '100px'}} className={lessThan1200 ? "imageCol order-4" : ""}>
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
                      <div style={{maxWidth: "100%", height: lessThan1200 ? "30vh" : "50vh"}}><Image src={URL.createObjectURL(selectedImage)} alt="example" className="deviceImage"/></div>
                    </TransformComponent>
                  </div>)}
                </TransformWrapper>
              </div>
              {imgs.length > 1 && <div className="choiseImagesContainer">
                {imgs.map((image, index) => (
                  <Image
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`choice ${index}`}
                    onClick={() => setSelectedImage(image)}
                    fluid
                  />
                ))}
              </div>}
            </div>
          )}
        </Col>
        <Col xl={7} className={lessThan1200 ? "order-1" : ""}>
          {!loadingType && <div className="panel attributesPanel">
            {selectedType.attributes.map((attribute, index) => (
              <div className="attributeElement" key={index}>
                <div className="attributeName">{attribute.name}</div>
                <Form.Select defaultValue="Оберіть значення" onChange={e => setValues({...values, [index]: {attributeId: attribute._id, value: e.target.value}})} style={{width: '15rem'}}>
                  <option value={""}>Оберіть значення...</option>
                  {attribute.values.map((value, index) => (
                    <option value={value} key={index}>{value}</option>
                  ))}
                </Form.Select>
              </div>
            ))}
          </div>}
        </Col>
        <Col xl={7} className={lessThan1200 ? "order-5 mb-5" : ""}>
          <Form.Group className="mt-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Опис товару</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={e => setDescription(e.target.value)}/>
          </Form.Group>
        </Col>
      </Row>

    </>
  )
}
 
export default DeviceCreate;