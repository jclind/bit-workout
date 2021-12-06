import React, { useState } from 'react'
import UpdateUserInput from '../../components/SettingsComponents/UpdateUserInput'

const UpdateUsername = () => {
  const [username, setUsername] = useState('test')
  return (
    <div className='update-name-page page'>
      <div className='settings-title'>Username</div>
      <UpdateUserInput
        placeholder={'Enter Updated Username'}
        val={username}
        setVal={setUsername}
        maxCharacters={30}
      />
    </div>
  )
}

export default UpdateUsername
