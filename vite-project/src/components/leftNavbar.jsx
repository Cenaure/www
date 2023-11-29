import React, {useContext} from 'react';
import { observer } from 'mobx-react-lite';
import "../css/components/leftNav.css"
import {useEffect, useState} from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import {motion} from "framer-motion";

const LeftNav = observer(() => {
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
  }, [])



  const [open, setOpen] = useState(false);

  return (
    <div className='leftNav'>
      <div className='navBg'
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Row className='pt-3 leftRow'>
          {
            types.map(type => (
              <Col md={{span: 12}} sm={{span: 3}} xs={{span: 6}} className='pt-1' key={type._id}>
                <button className='listBtn'>
                  {type.name}
                </button>
              </Col>
            ))
          }
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
            {
              devices.rows.map(device => (
                <h1 key={device._id}>{device.name}</h1>
              ))
            }
          </div>
        </>
      }
    </div>
  );
});
export default LeftNav;
