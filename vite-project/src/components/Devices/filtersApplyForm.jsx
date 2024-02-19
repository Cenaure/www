import React from 'react';

const FiltersApply = ({count, filterProductsByAttributes}) => {
  return(
    <div className='FiltersDropdown'>
      <p style={{margin: 0}}>{count} фільтрів</p>
      <button onClick={filterProductsByAttributes}>Застосувати</button>
    </div>
  )
}

export default FiltersApply;