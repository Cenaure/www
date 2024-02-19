import React, { useContext } from 'react';
import { Context } from '../main';
import '../css/components/General/searchElement.css'
import { Link } from 'react-router-dom';

const SearchElement = ({search, setSearch}) => {
  const {type, device} = useContext(Context)

  const items = [...device._devices.rows];

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  
  return(
    <div className={search == '' || filteredItems.length == 0 ? "" : "SearchElementContainer panel"}>
      {search !== '' && filteredItems.map(item => (
        <div key={item._id}>
          <Link to={`/device/${item._id}`} onClick={() => setSearch('')} style={{color: 'black'}}>{item.name}</Link>
        </div>
      ))}
    </div>
  )
}
 
export default SearchElement;
