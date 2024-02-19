import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AdminTypesList from '../../components/Admin/adminTypesList';
import { Context } from '../../main';
import typesDelete from '../../components/axios-components/types/typesDelete';
import { observer } from 'mobx-react-lite';
const CategoriesPage = () => {
  const {type} = useContext(Context)
  const [selectedItems, setSelectedItems] = useState([]);
  const [types, setTypes] = useState(type._types); 

  const handleCheckboxChange = (itemId, isChecked) => {
    if (isChecked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== itemId));
    }
  }

  const handleClickDelete = async () => {
    await typesDelete(selectedItems)
    await type.updateTypes() 
    setTypes(type._types) 
  }

  useEffect(() => {
    setTypes(type._types)
  }, [type.types])

  return(
    <div className='pageContainer'>
      <div className="devicesPageNav" style={{justifyContent: "space-between"}}>
        <NavLink></NavLink>
        <button className='myBtn createBtn' onClick={handleClickDelete}>Видалити</button>
        <NavLink to={'create'}><button className='myBtn createBtn'>Створити категорію</button></NavLink>
      </div>
      <AdminTypesList types={types} handleCheckboxChange={handleCheckboxChange}/>
    </div>
    
  )
}
 
export default observer(CategoriesPage);