import React, { useState, useEffect } from 'react'
import UpdateUserInput from '../../components/SettingsComponents/UpdateUserInput/UpdateUserInput'
import { useNavigate } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'

const UpdateUsername = () => {
  const { updateUserData, currUserData } = useAuth()
  const { username } = currUserData
  const navigate = useNavigate()

  const [newUsername, setNewUsername] = useState(username)

  useEffect(() => {
    if (newUsername !== '' && newUsername !== username) {
      const payload = { prop: 'username', val: newUsername }
      updateUserData(payload)
        .then(() => {
          console.log('hello there')
          navigate(-1)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [newUsername, username, updateUserData, navigate])

  return (
    <div className='update-name-page page'>
      <div className='settings-title'>Username</div>
      <UpdateUserInput
        placeholder={'Enter Updated Username'}
        val={newUsername}
        setVal={setNewUsername}
        maxCharacters={30}
      />
    </div>
  )
}

export default UpdateUsername
