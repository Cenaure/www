import React, { useState } from 'react';
import '../../css/components/Admin/deviceCard.css'
import { Row, Col, Image } from 'react-bootstrap';
import editIcon from '../../assets/icons/edit.png'
import { motion } from 'framer-motion';
import BrandCreate from './brandCreate';
const BrandCard = ({ brand, onCheckboxChange, onOpenModal, onCloseModal, isActive }) => {
  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, x: 0, y: 0 },
  };
  return(
    <>
      <div className="deviceCardContainer panel">
        <Row>
          <Col sm={12}>
            <div className="deviceCardLeftCol">
              <div className="deviceName"><span className="nowrap">{brand.name}</span></div>
              <div className='elementsGrid'>
                <div style={{cursor: 'pointer'}} onClick={() => !isActive ? onOpenModal(brand._id) : onCloseModal()}>
                  <Image src={editIcon} width={20}></Image>
                </div>
                <input type="checkbox" onChange={(e) => onCheckboxChange(brand._id, e.target.checked)} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <motion.div className={isActive ? "visible modalBrandCreation" : "modalBrandCreation"}
        initial="hidden" animate={isActive ? "visible" : "hidden"}
        variants={variants}>
        <BrandCreate onClose={() => onCloseModal()} brandToUpdate={brand}></BrandCreate>
      </motion.div>
    </>
  )
}
 
export default BrandCard;