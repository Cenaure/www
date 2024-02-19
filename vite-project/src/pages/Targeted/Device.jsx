import React, {useState, useEffect, useContext} from "react";
import { Container, Image, Row, Col, NavLink, Navbar, Nav } from "react-bootstrap";
import '@fontsource-variable/roboto-mono';
import "../../css/pages/device.css"
import "../../css/components/myBtn.css"
import heart from "../../css/imgs/heart.png"
import scales from "../../css/imgs/scales.svg"
import { useMediaPredicate } from "react-media-hook";
import { Link, useParams } from 'react-router-dom';
import Loader from '../../components/loader.jsx';
import { TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch';
import fetchOneType from "../../components/axios-components/types/fetchOneType.jsx";
import { Context } from "../../main.jsx";
import addToCart from "../../components/axios-components/cart/addToCart.jsx";
const Device = () => {
  const lessThan1200 = useMediaPredicate("(max-width: 1200px)");
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  const {device, type, basket, user} = useContext(Context)
  const [deviceOnPage, setDeviceOnPage] = useState({info: []});
  const [typeById, setTypeById] = useState();
  const [isLoading1, setIsLoading1] = useState(true);

  useEffect(() => {
    const device2 = device._devices.rows.filter(d => d._id === id);

    if (device2.length > 0) {
      setDeviceOnPage(device2[0]);
      setSelectedImage(import.meta.env.VITE_API_URL + '/' + device2[0].imgs[0]);
      setTypeById((type._types.filter(t => t._id == device2[0].typeId))[0])
    }
    setIsLoading1(false);
  }, [id]);

  if (isLoading1) {
    return <Loader />; 
  }

  const images = deviceOnPage.imgs.map((img) => import.meta.env.VITE_API_URL + '/' + img)
  const price = deviceOnPage.price
  const name =  deviceOnPage.name
  const firstFourAttributes = deviceOnPage.attributes.slice(0, 4);

  const handleAddToCart = async () => {
    await addToCart(deviceOnPage._id, 1, user._user.id)
    basket.updateBasket(user._user.id)
    basket.setOpen(true)
  }

  return(
    <Container fluid>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Головна</a></li>
          <li className="breadcrumb-item"><Link to={`/devices/type/${typeById._id}`}>{typeById.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{deviceOnPage.name}</li>
        </ol>
      </nav>

      <p className="name mainName">{name}</p>
      <div className="deviceHeader">
        <Navbar className="deviceHeader">
          <Nav>
            <Nav.Link href="#about">Все про товар</Nav.Link>
            <Nav.Link href="#characteristics">Характеристики</Nav.Link>
            <Nav.Link href="#description">Опис товару</Nav.Link>
            <Nav.Link href="#reviews">Відгуки та питання</Nav.Link>
          </Nav>
        </Navbar>
      </div>
      
      <div id="about"></div>
      <div className="deviceContainer">
        <Row>
          <Col xl={5} md={6} style={{padding: "0 20px"}}>
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
                      <div style={{maxWidth: "100%", height: "50vh"}}><Image src={selectedImage} alt="example" className="deviceImage"/></div>
                    </TransformComponent>
                  </div>)}
                </TransformWrapper>
              </div>
              {deviceOnPage.imgs.length != 1 && <div className="choiseImagesContainer">
                {images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`choice ${index}`}
                    onClick={() => 
                      setSelectedImage(image)
                    }
                    fluid
                  />
                ))}
              </div>}
            </div>
          </Col>
          <Col xl={7} md={6}> 
            <Row>
              {!lessThan1200 && <Col xl={6}>
                <div className="devicePanelBg mainCharacteristicsPanel" >
                  <Row>
                    {firstFourAttributes.map((attribute) => <Col xl={6} key={attribute._id}><p className="greyText">{attribute.name}</p><NavLink>{attribute.value}</NavLink></Col>)}
                  </Row>
                </div>
              </Col>}
              <Col xl={6} md={12}><div className="devicePanelBg">
                <div className="deviceMainActions">
                  <Row>
                    <Col xl={7} md={7} sm={7}><p className="price">{price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}<span> ₴</span></p></Col>
                    <Col xl={5} md={5} sm={5} className="statusCol"><div className="status"><p>У наявності</p></div></Col>
                    <Col xl={12} md={12} sm={12}><div className="center"><button className="myBtn basketAdd" onClick={() => handleAddToCart()}>Додати до кошика</button></div></Col>
                    <Col xl={12} md={12} sm={12}><div className="buttonsGroup">
                      <button className="favoriteBtn"><Image src={heart} alt="heart" /></button>
                      <button className="favoriteBtn"><Image src={scales} alt="scales" /></button>
                    </div></Col>
                  </Row>
                </div></div>
              </Col>
              {deviceOnPage.description && <Col xl={12} sm={12} md={12} className="descriptionCol">
                <div id="description"></div>
                <div className="devicePanelBg">
                  <div className="descriptionContainer">
                    <h2>Опис товару</h2>
                    <div className="descriptionPanel">
                      {deviceOnPage.description}
                    </div>
                  </div>
                </div>
              </Col>}
            </Row>
          </Col>
          
          <Col xl={12} sm={12} style={{padding: "0 20px", margin: "10px 0 0 0"}}>
            <div id="characteristics"></div>
            <div className="devicePanelBg">
              <div className="characteristics">
                <h4>Характеристики <p className="name">{name}</p></h4>
                {deviceOnPage.attributes.map((attribute) => 
                <div className="characteristicsElement" key={attribute._id}>
                  <p>{attribute.name}</p>
                  <p>{attribute.value}</p>
                </div>)}
              </div>
            </div>
          </Col>
          <Col xl={12} sm={12}>
            <div id="reviews"></div>
            <div className="feedbacks">
              <noscript><h3>Відгуки та питання</h3></noscript>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  )
}
 
export default Device;