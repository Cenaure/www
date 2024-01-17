import React, { useState } from 'react';
import '../../css/components/Admin/typesCreate.css'
import { Row, Col } from 'react-bootstrap';
import '../../css/components/button.css'
import createType from '../axios-components/typeCreate';
const TypesCreatePage = () => {
  const [name, setName] = useState();
  const [attributes, setAttributes] = useState([{ name: '', values: [''] }]);

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

  return (
    <>
      <header><button className='myBtn createBtn' onClick={() => createType(name, attributes)}>Зберегти</button></header>
      <div className='typesPageGrid'>
        <div>
          <div className="form-floating mb-3 deviceCreateForm" data-bs-theme="light">
            <input type="text" className="form-control" placeholder="Назва" value={name || ''} onChange={e => setName(e.target.value)}></input>
            <label htmlFor="floatingInput">Назва</label>
          </div>
        </div>
        <div style={{height: '50px'}}>
          {attributes.map((attribute, attrIndex) => (
            <div key={attrIndex} style={{display: 'grid', gridTemplateColumns: '5fr 1fr'}}>
              <input type="text" placeholder="Назва атрибута" className="attributeNameInput form-control mb-2" value={attribute.name} onChange={e => handleAttributeNameChange(attrIndex, e)} />
              <button onClick={() => removeAttribute(attrIndex)} className='button mt-0'>x</button>
            </div>
          ))}
          <button onClick={addAttribute} className='button'>Додати атрибут</button>
        </div>
        <div>
          {attributes.map((attribute, attrIndex) => (
            <div key={attrIndex} className='attrValuesContainer panel mt-3'>
              <h4 style={{width: '100%', textAlign: 'center', margin: '0'}}>{attribute.name}</h4>
              {attribute.values.map((value, valIndex) => (
                <div className='mt-1 inputWithSlash' key={valIndex}>
                  <input className='attributeValueInput' type="text" placeholder="Значення атрибута" value={value} onChange={e => handleAttributeValueChange(attrIndex, valIndex, e)} />
                  <div className="slash">/</div>
                </div>
              ))}
              <button onClick={() => addAttributeValue(attrIndex)} className='typesAddButton'>Додати значення</button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default TypesCreatePage;
