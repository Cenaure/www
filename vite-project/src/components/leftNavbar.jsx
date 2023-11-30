import React, {useContext} from 'react';
import { observer } from 'mobx-react-lite';
import "../css/components/leftNav.css"
import {useEffect, useState} from 'react';
import axios from 'axios';
import { Col, Row, Nav } from 'react-bootstrap';
import {motion} from "framer-motion";

const LeftNav = observer(() => {
  /*
  const [types, setTypes] = useState([]) 
  const [devices, setDevices] = useState([]) 

  useEffect(() => {
    axios.get('http://localhost:5000/api/Type')
      .then(res => {
        setTypes(res.data)
      }).catch(e => {
        console.log(e);
      })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:5000/api/device', {
      params: {
        typeId: "651ab83c453f0b35a575033e"
      }
    })
    .then(res => {
        setDevices(res.data)
    }).catch(e => {
        console.log(e);
    })
  }, [])*/



  const [open, setOpen] = useState(false);
  const [checker, setChecker] = useState("");

  return (
    <div className='leftNav'>
      <div className='navBg'
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Row className='pt-3 leftRow'> 
          <Col md={{span: 12}} sm={{span: 3}} xs={{span: 6}} className='pt-1'>
            <button className='listBtn'>
              Конфігуратор ПК
            </button>
          </Col>
          <Col md={{span: 12}} sm={{span: 3}} xs={{span: 6}} className='pt-1'
            onMouseEnter={() => setChecker("Компоненти")}  
          >
            <button className='listBtn'>
              Комплектуючі
            </button>
          </Col>
          <Col md={{span: 12}} sm={{span: 3}} xs={{span: 6}} className='pt-1'
            onMouseEnter={() => setChecker("Комп'ютери")}  
          >
            <button className='listBtn'>
              Комп'ютери
            </button>
          </Col>
          <Col md={{span: 12}} sm={{span: 3}} xs={{span: 6}} className='pt-1'>
            <button className='listBtn'>
              Периферія
            </button>
          </Col>
          <Col md={{span: 12}} sm={{span: 3}} xs={{span: 6}} className='pt-1'>
            <button className='listBtn'>
              Ноутбуки
            </button>
          </Col>
        </Row>
      </div>
      {open && 
        <>
          <motion.div className='shadow'
            initial={{opacity:0}} animate={{opacity: 1}}
            exit={{opacity: 0}}
          ></motion.div>
          <div className="backdrop-bg"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <div className="scrollContainer">
              {checker == "Компоненти" && 
                <Row className='changeRow'>
                  <Col md={{span: 6}} xl={{span: 4}}>
                    <Nav defaultActiveKey="/home" className="flex-column">
                      <Nav.Link eventKey="link-1">Процесори</Nav.Link>
                      <Nav.Link eventKey="link-2">Intel</Nav.Link>
                      <Nav.Link eventKey="link-3">AMD</Nav.Link> 
                      <Nav.Link eventKey="link-1">Усі процесори <span>&#62;</span></Nav.Link> 
                    </Nav>
                  </Col>
                  <Col md={{span: 6}} xl={{span: 4}}>
                    <Nav defaultActiveKey="/home" className="flex-column">
                      <Nav.Link eventKey="link-1">Материнські плати</Nav.Link>
                      <Nav.Link eventKey="link-2">для Intel</Nav.Link>
                      <Nav.Link eventKey="link-3">для AMD</Nav.Link> 
                      <Nav.Link eventKey="link-1">Усі материнські плати <span>&#62;</span></Nav.Link> 
                    </Nav>
                  </Col>
                  <Col md={{span: 6}} xl={{span: 4}}>
                    <Nav defaultActiveKey="/home" className="flex-column">
                      <Nav.Link eventKey="link-1">Відеокарти</Nav.Link>
                      <Nav.Link eventKey="link-2">Nvidia</Nav.Link>
                      <Nav.Link eventKey="link-3">AMD</Nav.Link> 
                      <Nav.Link eventKey="link-3">Intel Arc</Nav.Link> 
                      <Nav.Link eventKey="link-1">Усі відеокарти <span>&#62;</span></Nav.Link> 
                    </Nav>
                  </Col>  
                  <Col md={{span: 6}} xl={{span: 4}}>
                    <Nav defaultActiveKey="/home" className="flex-column">
                      <Nav.Link eventKey="link-1">Оперативна пам'ять</Nav.Link>
                      <Nav.Link eventKey="link-2">DDR5</Nav.Link>
                      <Nav.Link eventKey="link-3">DDR4</Nav.Link> 
                      <Nav.Link eventKey="link-3">DDR3</Nav.Link> 
                      <Nav.Link eventKey="link-1">Уся ОЗП <span>&#62;</span></Nav.Link> 
                    </Nav>
                  </Col>
                  <Col md={{span: 6}} xl={{span: 4}}>
                    <Nav defaultActiveKey="/home" className="flex-column">
                      <Nav.Link eventKey="link-1">Накопичувачі SSD і HDD</Nav.Link>
                      <Nav.Link eventKey="link-2">SSD</Nav.Link>
                      <Nav.Link eventKey="link-3">HDD</Nav.Link> 
                      <Nav.Link eventKey="link-3">M2  </Nav.Link> 
                      <Nav.Link eventKey="link-1">Усі накопичувачі <span>&#62;</span></Nav.Link> 
                    </Nav>
                  </Col>
                  <Col md={{span: 6}} xl={{span: 4}}>
                    <Nav defaultActiveKey="/home" className="flex-column">
                      <Nav.Link eventKey="link-1">Корпуси</Nav.Link>
                      <Nav.Link eventKey="link-2">Кастомні корпуси</Nav.Link>
                      <Nav.Link eventKey="link-3">Корпуси з БЖ</Nav.Link> 
                      <Nav.Link eventKey="link-3">Корпуси без БЖ</Nav.Link> 
                      <Nav.Link eventKey="link-1">Усі корпуси <span>&#62;</span></Nav.Link> 
                    </Nav>
                  </Col>
                  <Col md={{span: 6}} xl={{span: 4}}>
                    <Nav defaultActiveKey="/home" className="flex-column">
                      <Nav.Link eventKey="link-1">Блоки живлення</Nav.Link>
                      <Nav.Link eventKey="link-2">До 500 Вт</Nav.Link>
                      <Nav.Link eventKey="link-3">500-650 Вт</Nav.Link> 
                      <Nav.Link eventKey="link-3">700-1000 Вт</Nav.Link> 
                      <Nav.Link eventKey="link-3">1200-1500 Вт</Nav.Link> 
                      <Nav.Link eventKey="link-3">Більше за 1500 Вт</Nav.Link> 
                      <Nav.Link eventKey="link-1">Усі блоки живлення <span>&#62;</span></Nav.Link> 
                    </Nav>
                  </Col>
                  <Col md={{span: 6}} xl={{span: 4}}>
                    <Nav defaultActiveKey="/home" className="flex-column">
                      <Nav.Link eventKey="link-1">Системи охолодження</Nav.Link>
                      <Nav.Link eventKey="link-2">Повітряне охолодження для CPU</Nav.Link>
                      <Nav.Link eventKey="link-3">Рідинне охолодження для CPU</Nav.Link> 
                      <Nav.Link eventKey="link-3">Кулера для корпуса</Nav.Link> 
                      <Nav.Link eventKey="link-3">Термопаста</Nav.Link> 
                      <Nav.Link eventKey="link-3">Термопрокладки</Nav.Link> 
                      <Nav.Link eventKey="link-1">Усі товари<span>&#62;</span></Nav.Link> 
                    </Nav>
                  </Col>
                  <Col md={{span: 6}} xl={{span: 4}}>
                    <Nav defaultActiveKey="/home" className="flex-column">
                      <Nav.Link eventKey="link-1">Інше</Nav.Link>
                      <Nav.Link eventKey="link-2">Звукові карти</Nav.Link>
                      <Nav.Link eventKey="link-3">Мережеві карти</Nav.Link> 
                      <Nav.Link eventKey="link-3">Кабелі</Nav.Link> 
                      <div></div>
                    </Nav>
                  </Col>  
                </Row>
              }
              {checker == "Комп'ютери" && 
                <Row className='changeRow'>
                  <Col md={{span: 6}} xl={{span: 4}}>
                    <Nav defaultActiveKey="/home" className="flex-column">
                      <Nav.Link eventKey="link-1">Послуги</Nav.Link>
                      <Nav.Link eventKey="link-2">Збирання комп'ютера</Nav.Link>
                      <Nav.Link eventKey="link-3">Ремонтування комп'ютерів</Nav.Link> 
                      <Nav.Link eventKey="link-1">Усі послуги <span>&#62;</span></Nav.Link> 
                    </Nav>
                  </Col>
                  <Col md={{span: 6}} xl={{span: 4}}>
                    <Nav defaultActiveKey="/home" className="flex-column">
                      <Nav.Link eventKey="link-1">Каталог комп'ютерів</Nav.Link>
                      <Nav.Link eventKey="link-2">ПК для ігор</Nav.Link>
                      <Nav.Link eventKey="link-3">ПК для навчання</Nav.Link> 
                      <Nav.Link eventKey="link-3">Офісні ПК</Nav.Link> 
                      <Nav.Link eventKey="link-1">Усі комп'ютери <span>&#62;</span></Nav.Link> 
                    </Nav>
                  </Col>
                  <Col md={{span: 6}} xl={{span: 4}}>
                    <Nav defaultActiveKey="/home" className="flex-column">
                      <Nav.Link eventKey="link-1">Програмне забезпечення</Nav.Link>
                      <Nav.Link eventKey="link-2">Операційні системи</Nav.Link>
                      <Nav.Link eventKey="link-3">Антивіруси</Nav.Link> 
                      <Nav.Link eventKey="link-3">Офісні програми</Nav.Link> 
                      <div></div>
                    </Nav>
                  </Col>  
                </Row>
              }
            </div>
            
          </div>
        </>
      }
    </div>
  );
});
export default LeftNav;
