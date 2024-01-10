import React, {useState, useEffect, useContext} from "react";
import { Container, Image, Row, Col, NavLink, Navbar, Nav } from "react-bootstrap";
import '@fontsource-variable/roboto-mono';
import "../css/pages/device.css"
import "../css/components/myBtn.css"
import heart from "../css/imgs/heart.png"
import scales from "../css/imgs/scales.svg"
import { useMediaPredicate } from "react-media-hook";
import { useParams } from 'react-router-dom';
import Loader from '../components/loader.jsx';
import { TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch';
import fetchOneDevice from "../components/axios-components/fetchOneDevice.jsx";

const Device = () => {
  
  

  const lessThan1200 = useMediaPredicate("(max-width: 1200px)");
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  const [device, setDevice] = useState({info: []});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOneDevice(id)
      .then(data => {
        setDevice(data);
        setSelectedImage(import.meta.env.VITE_API_URL + '/' + data.imgs[0]);
        setIsLoading(false);
      })
  }, []);

  if (isLoading) {
    return <Loader />; 
  }

  console.log(device);
  const images = device.imgs.map((img) => import.meta.env.VITE_API_URL + '/' + img)
  const price = device.price
  const name =  device.name
  const firstFourAttributes = device.attributes.slice(0, 4);

  return(
    <Container fluid>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Головна</a></li>
          <li className="breadcrumb-item"><a href="#">Материнські плати</a></li>
          <li className="breadcrumb-item active" aria-current="page">Asus</li>
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
          <Col xl={5} style={{padding: "0 20px"}}>
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
              {device.imgs.length != 1 && <div className="choiseImagesContainer">
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
          <Col xl={7}> 
            <Row>
              {!lessThan1200 && <Col xl={6}>
                <div className="devicePanelBg mainCharacteristicsPanel" >
                  <Row>
                    {firstFourAttributes.map((attribute) => <Col xl={6} key={attribute._id}><p className="greyText">{attribute.name}</p><NavLink>{attribute.value}</NavLink></Col>)}
                  </Row>
                </div>
              </Col>}
              <Col xl={6}><div className="devicePanelBg">
                <div className="deviceMainActions">
                  <Row>
                    <Col xl={7} sm={7}><p className="price">{price}<span> ₴</span></p></Col>
                    <Col xl={5} sm={5} className="statusCol"><div className="status"><p>У наявності</p></div></Col>
                    <Col xl={12} sm={12}><div className="center"><button className="myBtn basketAdd">Додати до кошика</button></div></Col>
                    <Col xl={12} sm={12}><div className="buttonsGroup">
                      <button className="favoriteBtn"><Image src={heart} alt="heart" /></button>
                      <button className="favoriteBtn"><Image src={scales} alt="scales" /></button>
                    </div></Col>
                  </Row>
                </div></div>
              </Col>
              {device.description && <Col xl={12} className="descriptionCol">
                <div id="description"></div>
                <div className="devicePanelBg">
                  <div className="descriptionContainer">
                    <h2>Опис товару</h2>
                    <div className="descriptionPanel">
                      {device.description}
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
                {device.attributes.map((attribute) => 
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
              <h3>Відгуки та питання</h3>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  )
}
 
export default Device;