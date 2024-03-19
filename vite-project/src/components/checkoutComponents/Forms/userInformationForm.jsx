import React from 'react';
import { MyTextField } from '../../../utils/styledElements';
import InputMask from 'react-input-mask';

const UserInformationForm = ({user, handleFirstNameChange,
  handleSecondNameChange,
  handlePatronymicChange,
  handleEmailChange,
  handlePhoneNumberChange, errors}) => {
  return(
    <div className="">
      <h3>Інформація про клієнта</h3>
      <div className="forms mt-5">
        <MyTextField
          id="outlined-multiline-flexible"
          label="Прізвище"
          helperText={errors.secondName && "Вкажіть прізвище"}
          error={errors.secondName}
          maxRows={1}
          onChange={(e) => handleSecondNameChange(e)}
          defaultValue={user._user?.secondName}
        />
        <MyTextField
          error={errors.firstName}
          id="outlined-multiline-flexible"
          label="Ім'я"
          helperText={errors.firstName && "Вкажіть ім'я"}
          defaultValue={user._user?.firstName}
          onChange={(e) => handleFirstNameChange(e)}
          maxRows={1}
        />
        <MyTextField
          error={errors.patronymic}
          id="outlined-multiline-flexible"
          helperText={errors.patronymic && "Вкажіть по батькові"}
          label="По батькові"
          onChange={(e) => handlePatronymicChange(e)}
          maxRows={1}
        />
      </div>
      <div className="forms mt-4 mb-5">
        <MyTextField
          id="outlined-multiline-flexible"
          label="Пошта"
          error={errors.email}
          helperText={errors.email && "Вкажіть пошту"}
          maxRows={1}
          onChange={(e) => handleEmailChange(e)}
          defaultValue={user._user?.email}
          type='email'
        />
        <InputMask mask="+38 (099) 999-99-99" maskChar=" " onChange={(e) => handlePhoneNumberChange(e)}>
          {() => <MyTextField
            id="outlined-multiline-flexible"
            label="Номер телефону"
            helperText={errors.phoneNumber && "Вкажіть номер телефону"}
            error={errors.phoneNumber}
            maxRows={1}
          />}
        </InputMask>
      </div>
    </div>
  )
}
 
export default UserInformationForm;