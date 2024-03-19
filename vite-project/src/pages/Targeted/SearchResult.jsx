import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../css/pages/searchResultsPage.css'
import { Context } from '../../main';
import SearchResultItem from '../../components/search/searchResultItem';
const SearchResultsPage = () => {
  const {searchRequest} = useParams()
  const {type, brand, device} = useContext(Context)
  const [filteredTypes, setFilteredTypes] = useState([])
  const [filteredBrands, setFilteredBrands] = useState(['1'])
  const [filteredDevices, setFilteredDevices] = useState([])
  useEffect(() => {
    setFilteredTypes(type._types.filter(item => item.name.toLowerCase().includes(searchRequest.toLowerCase())));
    setFilteredBrands(brand._brands.filter(item => item.name.toLowerCase().includes(searchRequest.toLowerCase())));
    setFilteredDevices(device._devices.rows.filter(item => item.name.toLowerCase().includes(searchRequest.toLowerCase())));
  }, [searchRequest, type]);

  return (
    <div className='searchResultsPageContainer'>
      {filteredTypes.length > 0 && <div className="categoriesResults panel">
        <h3>Категорії</h3>
        {filteredTypes.map((type, index) => (
          <div className="" key={index}>{type.name}</div>
        ))}
      </div>}
      {filteredBrands.length > 0 &&
        <div className="brandsResults panel">
          <h3>Бренди</h3>
          {filteredBrands.map((brand, index) => (
            <div className="" key={index}>{brand.name}</div>
          ))}
        </div>}
      {filteredDevices.length > 0 &&
        <div className="devicesResults panel">
          <h3>Товари</h3>
          {filteredDevices.map((device, index) => (
            <SearchResultItem key={index} device={device}/>
          ))}
        </div>}
    </div>
  );
};

export default SearchResultsPage;