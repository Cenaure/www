import React, { useContext } from 'react';
import { Context } from '../main';
import '../css/components/General/searchElement.css'
import { Link } from 'react-router-dom';
import SearchResultItem from './search/searchResultItem';

const SearchElement = ({search, setSearch}) => {
  const {type, device} = useContext(Context)

  const items = [...device._devices.rows];

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  
  return(
    <div className={search == '' || filteredItems.length == 0 ? "" : "SearchElementContainer panel"}>
      {search !== '' && filteredItems.map((item, index) => (
        <div onClick={() => setSearch('')} style={{justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
          {index < 4 && <SearchResultItem device={item}/>}
          {index === 3 && <Link to={`/search/${search}`} style={{width: '100%', textAlign: 'center', color: 'black'}} className='mt-2'>Показати більше</Link>}
        </div>
      ))}
    </div>
  )
}
 
export default SearchElement;
