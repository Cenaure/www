import React, {useContext, useEffect, useState} from 'react';
import { Context } from '../../../main';
import { Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

const BrandsSelection = ({selectedBrands, setSelectedBrands}) => {
  const {brand} = useContext(Context)

  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBrandChange = (index, event) => {
    const newBrand = [...selectedBrands];
    newBrand[index] = {name: event.target.options[event.target.selectedIndex].text, id: event.target.value};
    setSelectedBrands(newBrand);
  };

  const addBrand = () => {
    setSelectedBrands([...selectedBrands, { name: '', id: '' }]);
  };

  const removeBrand = (index) => {
    setSelectedBrands(selectedBrands.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setBrands(brand._brands)
    setLoading(false)
  }, [brand._brands])

  if(loading) return(<></>)

  return (
    <div className="pageContainer">
      {selectedBrands.map((selectedBrand, index) => (
        <div key={index} style={{display: 'grid', gridTemplateColumns: '6fr 1fr', marginTop: '10px'}}>
          <Form.Select 
            value={selectedBrand.id}
            onChange={e => handleBrandChange(index, e)} 
            style={{width: '100%', height:'100%'}}
          >
            <option value={selectedBrand.id}>{selectedBrand.name == '' ? "Оберіть бренд..." : selectedBrand.name}</option>
            {brands.filter(brand => !selectedBrands.some(b => b.id === brand._id)).map((brand, i) => (
              <option value={brand._id} key={i}>{brand.name}</option>
            ))}
          </Form.Select>
          <button onClick={() => removeBrand(index)} className='button mt-0'>x</button>
        </div>
      ))}
      <button onClick={addBrand} className='button'>Додати бренд</button>
    </div>
  );
}
 
export default observer(BrandsSelection);
