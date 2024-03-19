import React from 'react';
import { Select, MenuItem, InputLabel } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { MyFormControl , MyTextField } from '../../../utils/styledElements';

const DeliveryInformationForm = ({dataCities, delivery, handleDeliveryChange, city, dataStates,
  handlePostindexChange, errors, filteredData, handleCityChange, setStreet, setApartmentNumber, 
  setHouse, dataDeliveryTypes}) => {

  return(
    <div className="mb-5">
      <h3>Інформація про доставку</h3>
      <div className="forms mt-5">
        <Autocomplete style={{width: '300px'}}
          
          freeSolo
          id="cityInput"
          disableClearable
          options={dataCities.map((option, index) => option.public_name.uk)}
          onChange={(newValue) => {
            handleCityChange(newValue);
          }}

          onInputChange={(event, newInputValue) => {
            if (newInputValue === '') {
              handleCityChange(null);
            }
          }}

          filterOptions={(options, params) => {
            const filtered = params.inputValue.length >= 2
              ? options.filter((option) => 
                  option.toLowerCase().includes(params.inputValue.toLowerCase())
                )
              : [];
            return filtered;
          }}
          renderInput={(params) => (
            <MyTextField required 
              error={errors.locality}
              helperText={errors.locality && "Вкажіть населений пункт"}
              {...params}
              label="Оберіть населений пункт"
              
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
      </div>
      {city && <div className="forms mt-4">
        <MyFormControl variant="outlined" style={{width: '300px'}} required>
          <InputLabel id="delivery-label">Тип доставки</InputLabel>
          <Select
            labelId="delivery-label"
            id="delivery-select"
            value={delivery?.name || ''}
            onChange={handleDeliveryChange}
            label="Тип доставки"
          >
            {dataDeliveryTypes.map((type, index) => (
              <MenuItem value={type.name} key={index}>{type.name}</MenuItem>
            ))}
          </Select>
        </MyFormControl>
        </div>}
      {delivery && <div className="forms mt-4">
          {delivery.name == "Кур'єрська доставка" &&
            <>
              <MyTextField 
                error={errors.street}
                helperText={errors.street && "Вкажіть вулицю"}
                required
                id="outlined-multiline-flexible"
                label="Вулиця"
                maxRows={1}
                onChange={(e) => setStreet(e.target.value)}
              />
              <MyTextField
                error={errors.house}
                helperText={errors.house && "Вкажіть будинок"} 
                required
                id="outlined-multiline-flexible"
                label="Будинок"
                maxRows={1}
                onChange={(e) => setHouse(e.target.value)}
              />
              <MyTextField
                error={errors.apartment}
                helperText={errors.apartment && "Вкажіть номер квартири"}  
                required
                id="outlined-multiline-flexible"
                label="Квартира"
                maxRows={1}
                onChange={(e) => {setApartmentNumber(e.target.value), console.log(e.target.value)}}
              />
            </>
          }
          {/*
          <MyFormControl variant="outlined" style={{width: '300px'}}>
            <InputLabel id="region-label">Область</InputLabel>
            <Select
              labelId="region-label"
              id="region-select"
              value={region}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5,
                    width: 250,
                  },
                },
              }}
              onChange={handleRegionChange}
              label="Країна"
            >
              {dataStates.map((state, index) => (
                <MenuItem value={state} index={index}>{state}</MenuItem>
              ))}
            </Select>
          </MyFormControl>
          */}
          {delivery.name == "Укрпошта" &&
          <Autocomplete
            freeSolo
            id="postindex-select"
            disableClearable
            style={{ width: '300px' }}
            options={filteredData.map((item) => item['Поштовий індекс (Postal code)'] + ' ' + item['Населений пункт'] + ' ' + item['Район (новий)'])}
            onChange={(event, newValue) => {  
              handlePostindexChange(newValue);
            }}
            
            onInputChange={(event, newInputValue) => {
              if (newInputValue === '') {
                handlePostindexChange(null);
              }
            }}

            renderInput={(params) => (
              <MyTextField required
                {...params}
                error={errors.postalCode}
                helperText={errors.postalCode && "Введіть поштовий індекс"}
                label="Поштовий індекс"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />}
        </div>}
    </div>
  )
}
 
export default DeliveryInformationForm;