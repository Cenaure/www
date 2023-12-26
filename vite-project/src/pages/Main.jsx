import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import Slider from "../components/Slider";
import LeftNav from "../components/leftNavbar";
import { useMediaPredicate } from "react-media-hook";
import "../css/pages/main.css"
import "../css/components/breadcrumb.css"
import amdLogo from '../css/imgs/AMD-logo.png';
import amdRadeonLogo from '../css/imgs/AMDRadeon-logo.png';
import intelLogo from '../css/imgs/Intel-logo.png';
import motherboardLogo from '../css/imgs/Motherboard-logo.png';
import nvidiaLogo from '../css/imgs/Nvidia-logo.png';
import intelMotherboardLogo from '../css/imgs/IntelMotherboard-logo.png';
import Eva02 from '../css/imgs/Eva02-logo.jpg';
import DDR5 from '../css/imgs/DDR5-logo.png';

const Main = () => {

  const lessThan500 = useMediaPredicate("(max-width: 320px)");

  return (
    <Container fluid>
   
      <noscript>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active"><a href="#">Головна</a></li>
            <li class="breadcrumb-item"><a href="#">Процесори</a></li>
            <li class="breadcrumb-item active" aria-current="page">Amd</li>
          </ol>
        </nav>
      </noscript>
      <Row>
        <Col md={{span: 3, order: 1}} xs={{order: 2}}>
          <LeftNav>
          </LeftNav>
        </Col>
        {!lessThan500 && <Col md={{span: 9, order: 2}} xs={{order: 1}} className='p-3'><Slider /></Col>}
      </Row>

      <div className="popular-text-div">
        <h2>Популярні запити</h2>
      </div>
      <div className='popular'>
        <div><img src={amdLogo}></img>Процесори AMD</div>
        <div><img src={amdRadeonLogo}></img>Відеокарти AMD</div>
        <div><img src={motherboardLogo}></img>Материнські плати для AMD</div>
        <div><img src={DDR5}></img>Оперативна пам'ять DDR5</div>
        <div><img src={intelLogo}></img>Процесори Intel</div>
        <div><img src={nvidiaLogo}></img>Відеокарти Nvidia</div>
        <div><img src={intelMotherboardLogo}></img>Материнські плати для Intel</div>
        <div><img src={Eva02}></img>Готові збірки</div>
      </div>
    </Container>
  );
};

export default Main;