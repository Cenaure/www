import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { NavLink } from 'react-router-dom';
import '../../css/pages/brandsPage.css'
import BrandCard from '../../components/Admin/brandCard';
import { motion } from 'framer-motion';
import BrandCreate from '../../components/Admin/brandCreate';
import brandsDelete from '../../components/axios-components/brands/deleteBrands';

const BrandsPage = () => {
  const {brand} = useContext(Context)
  const [brands, setBrands] = useState({info: []})
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])

  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  const handleCheckboxChange = (itemId, isChecked) => {
    if (isChecked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== itemId));
    }
  }

  const handleClickDelete = async () => {
    await brandsDelete(selectedItems)
    await brand.updateBrands() 
    setBrands(brand._brands) 
  }

  const [activeModal, setActiveModal] = useState(null);

  const handleOpenModal = (brandId) => {
    setActiveModal(brandId);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    setBrands(brand._brands)
    setLoading(false)
  }, [brand._brands])

  return(
    <div className="pageContainer">
      <div className="navBrands">
        <div></div>
        <button className='myBtn createBtn' onClick={handleClickDelete}>Видалити</button>
        <div>
          <button className='myBtn createBtn' style={{width: '200px'}} onClick={() => setShowCreateModal(!showCreateModal)}>{showCreateModal ? "Закрити вікно" : "Створити бренд"}</button>
          <motion.div className={showCreateModal ? "visible modalBrandCreation" : "modalBrandCreation"}
          initial="hidden" animate={showCreateModal ? "visible" : "hidden"}
          variants={variants}>
            <BrandCreate setShowCreateModal={setShowCreateModal}></BrandCreate>
          </motion.div>
        </div>
      </div> 
      <div className='p-2'>
        {!loading && brands.map((brand, index) => (
          <BrandCard
            key={index}
            brand={brand}
            onOpenModal={handleOpenModal}
            onCloseModal={handleCloseModal}
            onCheckboxChange={handleCheckboxChange}
            isActive={activeModal === brand._id}
          />
        ))}
      </div>
    </div>
  )
}
 
export default observer(BrandsPage);