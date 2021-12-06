import React, { useState } from 'react'
import UpdateUserInput from '../../components/SettingsComponents/UpdateUserInput'

const UpdateName = () => {
  const [name, setName] = useState('Jesse Lind')
  return (
    <div className='update-name-page page'>
      <div className='settings-title'>Update Name</div>
      <UpdateUserInput
        placeholder={'Enter Updated Name'}
        val={name}
        setVal={setName}
        maxCharacters={30}
      />
    </div>
  )
}

export default UpdateName
