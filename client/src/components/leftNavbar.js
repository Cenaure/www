import React, {useContext} from 'react';
import { observer } from 'mobx-react-lite';
import "../css/components/leftNav.css"
import { Context } from '..';
import { Col, Row } from 'react-bootstrap';

const LeftNav = observer(() => {
  const {type} = useContext(Context)
  return (
    <div className='leftNav'>
      <div className='navBg'>
        <Row className='pt-3'>
          <Col md={{span: 12}} sm={{span: 3}} xs={{span: 6}} className='pt-1'>
            <button className='listBtn'>
              
              Type 1
            </button>
          </Col>
          <Col md={{span: 12}} sm={{span: 3}} xs={{span: 6}} className='pt-1'>
            <button className='listBtn'>
              Type 2
            </button>
          </Col>
          <Col md={{span: 12}} sm={{span: 3}} xs={{span: 6}} className='pt-1'>
            <button className='listBtn'>
              Type 3
            </button>
          </Col>
          <Col md={{span: 12}} sm={{span: 3}} xs={{span: 6}} className='pt-1'>
            <button className='listBtn'>
              Type 4
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
});
export default LeftNav;
