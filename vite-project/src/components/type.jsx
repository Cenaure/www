import {useEffect, useState} from 'react';
import axios from 'axios';
const Type = () => {
    
  const [type, setType] = useState() 
  useEffect(() => {
    axios.get('http://localhost:5000/types')
      .then(res => {
        setType(res.data)
      }).catch(e => {
        console.log(e);
      })
  })

  return (
    <Col md={{span: 12}} sm={{span: 3}} xs={{span: 6}} className='pt-1'>
      <button className='listBtn'>
        {type.name}
      </button>
    </Col>
  );
};

export default Type;