import React from 'react';
import {Col, Row} from 'react-bootstrap';
import Slider from "../components/Slider";
import LeftNav from "../components/leftNavbar";
import { useMediaPredicate } from "react-media-hook";
import "../css/pages/main.css"
const Main = () => {

  const lessThan500 = useMediaPredicate("(max-width: 320px)");

  return (
    <Row>
      <Col md={{span: 3, order: 1}} xs={{order: 2}}>
        <LeftNav>
        </LeftNav>
      </Col>
      {!lessThan500 && <Col md={{span: 9, order: 2}} xs={{order: 1}} className='p-3'><Slider /></Col>}
    </Row>
  );
};

export default Main;