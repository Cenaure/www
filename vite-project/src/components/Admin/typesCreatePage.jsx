import React, { useContext, useState, useEffect } from 'react';
import '../../css/components/Admin/typesCreate.css'
import '../../css/components/button.css'
import typeValidation from '../validation/typeValidation';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import CategoryMainCreate from './category/categoryMainCreate';
import BrandsSelection from './category/brandsSelection';
import { useLocation } from 'react-router-dom';
import PageNotFound from '../../pages/PageNotFound';

const TypesCreatePage = () => {
  const {id} = useParams();
  const {type, brand} = useContext(Context)
  const [name, setName] = useState();
  const [attributes, setAttributes] = useState([{ name: '', values: [''] }]);

  const [invClass, setInvClass] = useState({
    name: "form-control",
  });
  const [activeLink, setActiveLink] = useState('');
  const [errors, setErrors] = useState({})
  let navigate = useNavigate()
  const [selectedBrands, setSelectedBrands] = useState([{ name: '', id: '' }]);
  const handleAttributeNameChange = (index, event) => {
    const newAttributes = [...attributes];
    newAttributes[index].name = event.target.value;
    setAttributes(newAttributes);
  };

  const handleAttributeValueChange = (attrIndex, valIndex, event) => {
    const newAttributes = [...attributes];
    newAttributes[attrIndex].values[valIndex] = event.target.value;
    setAttributes(newAttributes);
  };

  const addAttribute = () => {
    setAttributes([...attributes, { name: '', values: [''] }]);
  };

  const removeAttribute = (index) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const addAttributeValue = (index) => {
    const newAttributes = [...attributes];
    newAttributes[index].values.push('');
    setAttributes(newAttributes);
  };

  const location = useLocation();

  const handleCategoryClick = (e) => {
    if (location.pathname.includes('/brands')) {
      setActiveLink('category');
      e.preventDefault();
      navigate(-1);
    }
  };

  const handleBrandClick = () => {
    setActiveLink('brands');
  };

  const handleSubmit = async () => {
    console.log(selectedBrands)
    let data = await typeValidation(name, attributes, selectedBrands, id)
    setErrors(data[0])
    setInvClass(data[1])
    if(Object.keys(data[0]).length === 0){
      await type.updateTypes()
      navigate("/admin/categories")
    }
  };

  useEffect(() => {
    if(id){
      let types = type._types;
      let typeById = types.find(type => type._id === id);
      setName(typeById.name)
      setAttributes(typeById.attributes)

    
      setSelectedBrands(typeById.brands.reduce((acc, brandId) => {
        const brandF = brand._brands.find(b => b._id === brandId);
        if (brandF) {
          acc.push({ name: brandF.name, id: brandF._id });
        }
        return acc;
      }, []));
    }
  }, [id])

  console.log(selectedBrands)
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0 20px'}}>
        <div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
          <OverlayTrigger placement={'right'} overlay={
              <Tooltip id={`tooltip-right`}>
                Налаштуйте назву та характеристики товарів які будуть належати цій категорії
              </Tooltip>
            }>
            <NavLink onClick={handleCategoryClick} style={{textDecoration: 'none'}} ><div className={`brandsTypeLink ${activeLink === 'category' ? 'active' : ''}`}>Категорія</div></NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement={'right'} overlay={
              <Tooltip id={`tooltip-right`}>
                Налаштуйте бренди які виготовляють товари цієї категорії
              </Tooltip>
            }>
            <NavLink style={{textDecoration: 'none'}} to={'brands'}><div className={`brandsTypeLink ${activeLink === 'brands' ? 'active' : ''}`} onClick={handleBrandClick}>Бренди категорії</div></NavLink>
          </OverlayTrigger>
        </div>
        <button className='myBtn createBtn' onClick={handleSubmit}>Зберегти</button>
      </div>
      <Routes> 
        <Route path='/' element={<CategoryMainCreate invClass={invClass} attributes={attributes} name={name} errors={errors} addAttribute={addAttribute}
        removeAttribute={removeAttribute} handleAttributeNameChange={handleAttributeNameChange} handleAttributeValueChange={handleAttributeValueChange} 
        setName={setName} addAttributeValue={addAttributeValue}/>}></Route>
        <Route path='/brands' element={<BrandsSelection selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands}/>}/>
        <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </>
  )
}

export default observer(TypesCreatePage);
