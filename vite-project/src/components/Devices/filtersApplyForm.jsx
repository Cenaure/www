import React from 'react';

const FiltersApply = ({count}) => {
  return(
    <div>
      <span>{count} фільтрів</span>
      <button onClick={() => {/* Apply filters */}}>Застосувати</button>
    </div>
  )
}

export default FiltersApply;