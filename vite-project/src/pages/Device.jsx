import React, {useState} from "react";
import { Container, Image, Row, Col, NavLink, Navbar, Nav } from "react-bootstrap";
import '@fontsource-variable/roboto-mono';
import "../css/pages/device.css"
import img1 from "../css/imgs/5108314144_w640_h640_materinska-plata-asus.webp"
import img2 from "../css/imgs/asus-rog-maximus-z790-hero-eva-02-edition-s1700-intel-z790.jpg"
import img3 from "../css/imgs/4129095115.jpg"
import "../css/components/myBtn.css"
import heart from "../css/imgs/heart.png"
import scales from "../css/imgs/scales.svg"
import { useMediaPredicate } from "react-media-hook";

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
const Device = () => {
  const price = 36851
  const name = "Материнська плата Asus ROG MAXIMUS Z790 HERO EVA-02 (90MB1FL0M0EAY0)"
  const images = [img1, img2, img3, img1, img2, img1, img2, img1, img2]
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const lessThan1200 = useMediaPredicate("(max-width: 1200px)");


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
                      <Image src={selectedImage} alt="example" className="deviceImage"/>
                    </TransformComponent>
                  </div>)}
                </TransformWrapper>
              </div>
              <div className="choiseImagesContainer">
                {images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`choice ${index}`}
                    onClick={() => setSelectedImage(image)}
                    fluid
                  />
                ))}
              </div>
            </div>
          </Col>
          <Col xl={7}> 
            <Row>
              {!lessThan1200 && <Col xl={6}>
                <div className="devicePanelBg mainCharacteristicsPanel" >
                  <Row>
                    <Col xl={6}><p className="greyText">Форм-фактор</p><NavLink>ATX</NavLink></Col>
                    <Col xl={6}><p className="greyText">Тип роз'єму процесора</p><NavLink>LGA1700</NavLink></Col>
                    <Col xl={6}><p className="greyText">Тип</p><NavLink>Материнські плати Intel</NavLink></Col>
                    <Col xl={6}><p className="greyText">Сумісні ОЗП</p><NavLink>DDR5 для ПК</NavLink></Col>
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
              <Col xl={12} className="descriptionCol">
                <div id="description"></div>
                <div className="devicePanelBg">
                  <div className="descriptionContainer">
                    <h2>Опис товару</h2>
                    <div className="descriptionPanel">
                      <p>
                        <span className="nameText">Материнська плата Asus ROG MAXIMUS Z790 HERO EVA-02</span> - це високоякісний продукт, який відповідає найвищим стандартам продуктивності та надійності.
                      </p>
                      <p>
                        Ця материнська плата оснащена набором мікросхем <span className="nameText">Intel Z790</span>, що забезпечує підтримку найновіших процесорів Intel. Вона також має чотири слоти для пам’яті <span className="nameText">DDR5</span>, що дозволяють встановити до <span className="nameText">128 ГБ</span> оперативної пам’яті.
                      </p>
                      <p>
                        <span className="nameText">Asus ROG MAXIMUS Z790 HERO EVA-02</span> має два слоти <span className="nameText">PCIe 4.0 x16</span> для встановлення відеокарт, а також шість портів SATA для підключення накопичувачів. Ця материнська плата також має вбудований Wi-Fi 6 та Bluetooth 5.0 для бездротового підключення.
                      </p>
                      <p style={{marginBottom: 0}}>
                        Дизайн EVA-02 відображає естетику “Evangelion”, що робить цю материнську плату ідеальним вибором для фанатів цього аніме.
                      </p>
                    </div>

                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          
          <Col xl={12} sm={12} style={{padding: "0 20px", margin: "10px 0 0 0"}}>
            <div id="characteristics"></div>
            <div className="devicePanelBg">
              <div className="characteristics">
                <h4>Характеристики <p className="name">{name}</p></h4>
                <div className="characteristicsElement">
                  <p>Гарантійний термін</p>
                  <p>12 міс</p>
                </div>
                <div className="characteristicsElement">
                  <p>Виробник</p>
                  <p>Asus</p>
                </div>
                <div className="characteristicsElement">
                  <p>Роз'єм процесора</p>
                  <p>LGA1700</p>
                </div>
                <div className="characteristicsElement">
                  <p>Чіпсет (Північний міст)</p>
                  <p>Intel Z790</p>
                </div>
                <div className="characteristicsElement">
                  <p>Тип пам'яті</p>
                  <p>DDR5 DIMM</p>
                </div>
                <div className="characteristicsElement">
                  <p>Сумісні ОЗП</p>
                  <p>DDR5 для ПК</p>
                </div>
                <div className="characteristicsElement">
                  <p>Кількість слотів пам'яті</p>
                  <p>4</p>
                </div>
                <div className="characteristicsElement">
                  <p>Гарантійний термін</p>
                  <p>12 міс</p>
                </div>
                <div className="characteristicsElement">
                  <p>Виробник</p>
                  <p>Asus</p>
                </div>
                <div className="characteristicsElement">
                  <p>Роз'єм процесора</p>
                  <p>LGA1700</p>
                </div>
                <div className="characteristicsElement">
                  <p>Чіпсет (Північний міст)</p>
                  <p>Intel Z790</p>
                </div>
                <div className="characteristicsElement">
                  <p>Тип пам'яті</p>
                  <p>DDR5 DIMM</p>
                </div>
                <div className="characteristicsElement">
                  <p>Сумісні ОЗП</p>
                  <p>DDR5 для ПК</p>
                </div>
                <div className="characteristicsElement">
                  <p>Кількість слотів пам'яті</p>
                  <p>4</p>
                </div>
                <div className="characteristicsElement">
                  <p>Гарантійний термін</p>
                  <p>12 міс</p>
                </div>
                <div className="characteristicsElement">
                  <p>Виробник</p>
                  <p>Asus</p>
                </div>
                <div className="characteristicsElement">
                  <p>Роз'єм процесора</p>
                  <p>LGA1700</p>
                </div>
                <div className="characteristicsElement">
                  <p>Чіпсет (Північний міст)</p>
                  <p>Intel Z790</p>
                </div>
                <div className="characteristicsElement">
                  <p>Тип пам'яті</p>
                  <p>DDR5 DIMM</p>
                </div>
                <div className="characteristicsElement">
                  <p>Сумісні ОЗП</p>
                  <p>DDR5 для ПК</p>
                </div>
                <div className="characteristicsElement">
                  <p>Кількість слотів пам'яті</p>
                  <p>4</p>
                </div>
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