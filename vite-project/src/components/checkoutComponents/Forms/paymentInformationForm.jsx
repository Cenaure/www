import React from 'react';
import { MyFormControl } from '../../../utils/styledElements';
import { Select, MenuItem, InputLabel, Icon } from '@mui/material';
import Cash from '../../../assets/icons/cash-svgrepo-com.svg'
import { Image } from 'react-bootstrap';
const PaymentInformationForm = ({paymentMethod, handlePaymentMethodChange}) => {
  return(
    <div className="forms mt-5">
      <MyFormControl variant="outlined" style={{width: '300px'}} required>
        <InputLabel id="delivery-label">Форма оплати</InputLabel>
        <Select
          labelId="delivery-label"
          id="delivery-select"
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
          label="Форма оплати"
        >
          <MenuItem value={'Оплата готівкою'}>
            <Image src={Cash} alt="Cash Icon" width={30} className='m-2'/> При отриманні
          </MenuItem>
          <MenuItem value={'Безготівковий рахунок із ПДВ'}>Безготівковий рахунок із ПДВ</MenuItem>
          <MenuItem value={'Безготівковий рахунок без ПДВ'}>Безготівковий рахунок без ПДВ</MenuItem>
        </Select>
      </MyFormControl>
    </div>
  )
}
 
export default PaymentInformationForm;