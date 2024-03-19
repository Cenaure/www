import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import TypeCard from './typeCard';
import { observer } from 'mobx-react-lite';
import TablePagination from '@mui/material/TablePagination'

const AdminTypesList = ({types, handleCheckboxChange}) => {
  const {type} = useContext(Context)
  const [loading, setLoading] = useState(true)
  const [typesOnPage, setTypesOnPage] = useState({info: []})
  const [typesFiltered, setTypesFiltered] = useState({info: []})
  const [search, setSearch] = useState('');
  const items = [...types];
  const [filteredItems, setFilteredItems] = useState(items.filter(item => item.name.toLowerCase().includes(search.toLowerCase())));
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    const indexOfLastDevice = (currentPage + 1) * rowsPerPage
    const indexOfFirstDevice = indexOfLastDevice - rowsPerPage
    setTypesFiltered(filteredItems)
    setTypesOnPage(filteredItems.slice(indexOfFirstDevice, indexOfLastDevice))
    setLoading(false)
  }, [types, filteredItems]) 

  useEffect(() => {
    setFilteredItems(items.filter(item => item.name.toLowerCase().includes(search.toLowerCase())))
  }, [search])
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0); 
  }

  return(
    <div className='p-2'>
      <div className="paginationContainer mt-1">
        <form className='searchField'>
          <input type='text' placeholder='Введіть текст для пошуку' name='q' onChange={e => setSearch(e.target.value)}>
              
          </input>
        </form>
        <TablePagination
          component="div"
          count={typesFiltered.length}
          page={currentPage}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={'Категорій на сторінці:'}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} з ${count !== -1 ? count : `більш за ${to}`}`}
        />
      </div>
      {!loading && typesOnPage.map((type, index) => (
        <TypeCard key={index} type={type} onCheckboxChange={handleCheckboxChange} />
      ))}
    </div>
  )
}
 
export default observer(AdminTypesList);