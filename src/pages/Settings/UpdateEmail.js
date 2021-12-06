import React, { useState } from 'react'
import UpdateUserInput from '../../components/SettingsComponents/UpdateUserInput'

const UpdateEmail = () => {
  const [email, setEmail] = useState('test@gmail.com')
  return (
    <div className='update-name-page page'>
      <div className='settings-title'>Email</div>
      <UpdateUserInput
        placeholder={'Enter Updated Email'}
        val={email}
        setVal={setEmail}
        maxCharacters={30}
        input={'email'}
      />
    </div>
  )
}

export default UpdateEmail
