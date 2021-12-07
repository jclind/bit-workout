import React, { useState, useEffect } from 'react'
import UpdateUserInput from '../../components/SettingsComponents/UpdateUserInput'
import { useNavigate } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'

const UpdateUsername = () => {
  const { updateUserData, currUserData } = useAuth()
  const {
    username: { currUsername },
  } = currUserData
  const navigate = useNavigate()

  const [username, setUsername] = useState('test')

  useEffect(() => {
    if (username !== '' && username !== currUsername) {
      const payload = { prop: 'name', val: username }
      updateUserData(payload)
        .then(() => {
          console.log('hello there')
          navigate(-1)
        })
        .catch(err => {
          console.log(err)
        })
      console.log('it worked perhaps!')
    }
  }, [username])

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
