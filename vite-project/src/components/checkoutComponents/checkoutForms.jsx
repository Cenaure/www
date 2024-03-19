import React, {useContext, useState, useEffect} from 'react';
import { Context } from '../../main';
import UserInformationForm from './Forms/userInformationForm';
import DeliveryInformationForm from './Forms/deliveryInformationForm';
import PaymentInformationForm from './Forms/paymentInformationForm';

const CheckoutForms = ({dataCities, delivery, handleDeliveryChange, city, postindex, dataStates, paymentMethod, handlePaymentMethodChange,
  handlePostindexChange, data, setIsLoading, isLoading, handleCityChange, setStreet, setApartmentNumber, setHouse,
  handleFirstNameChange,
  handleSecondNameChange,
  handlePatronymicChange,
  handleEmailChange, dataDeliveryTypes,
  handlePhoneNumberChange, errors}) => {
  const {user} = useContext(Context);

  const [search, setSearch] = useState(null);
  //const [searchCity, setSearchCity] = useState(null);
  const [filteredData, setFilteredData] = useState(null)
  const [isLoadingStates, setIsLoadingStates] = useState(true)
  const [isLoadingDeliveryTypes, setIsLoadingDeliveryTypes] = useState(true)

  useEffect(() => {
    if(data && dataCities && dataStates) setIsLoading(false)
    setFilteredData(data?.filter(item => 
      (city ? item['Населений пункт'].toString().includes(city) : true) &&
      (search ? item['Поштовий індекс (Postal code)'].toString().includes(search) : true)
    ))
  }, [city, search, data])

  useEffect(() => {
    if(dataStates) setIsLoadingStates(false)
  }, [dataStates])
  useEffect(() => {
    if(dataDeliveryTypes) setIsLoadingDeliveryTypes(false)
  }, [dataDeliveryTypes])

  if(isLoading || isLoadingStates || isLoadingDeliveryTypes) return <></>
  return(
    <div className="checkoutFormContainer">
      <UserInformationForm 
        user={user} 
        errors={errors}
        handleFirstNameChange={handleFirstNameChange}
        handleSecondNameChange={handleSecondNameChange}
        handlePatronymicChange={handlePatronymicChange}
        handleEmailChange={handleEmailChange}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />
      <DeliveryInformationForm 
        errors={errors}
        dataCities={dataCities} 
        delivery={delivery}
        handleDeliveryChange={handleDeliveryChange} 
        postindex={postindex}
        handlePostindexChange={handlePostindexChange}
        handleCityChange={handleCityChange}
        user={user}
        city={city}
        search={search}
        filteredData={filteredData}
        dataStates={dataStates}
        setApartmentNumber={setApartmentNumber}
        setHouse={setHouse}
        setStreet={setStreet}
        dataDeliveryTypes={dataDeliveryTypes}
      />
      <h3>Інформація про оплату</h3>
      <PaymentInformationForm 
        paymentMethod={paymentMethod}
        handlePaymentMethodChange={handlePaymentMethodChange}
      />
    </div>
  )
}
 
export default CheckoutForms;