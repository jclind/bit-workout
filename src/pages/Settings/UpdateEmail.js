import React, { useState, useEffect } from 'react'
import UpdateUserInput from '../../components/SettingsComponents/UpdateUserInput'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router'

const UpdateEmail = () => {
  const [newEmail, setNewEmail] = useState('test@gmail.com')
  const { updateEmail, currentUser } = useAuth()
  const { email } = currentUser
  const navigate = useNavigate()

  useEffect(() => {
    if (newEmail !== '' && newEmail !== email) {
      updateEmail(newEmail)
        .then(() => {
          console.log('hello there')
          navigate(-1)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [newEmail])

  return (
    <div className='update-name-page page'>
      <div className='settings-title'>Email</div>
      <UpdateUserInput
        placeholder={'Enter Updated Email'}
        val={newEmail}
        setVal={setNewEmail}
        maxCharacters={30}
        input={'email'}
      />
    </div>
  )
}

export default UpdateEmail
