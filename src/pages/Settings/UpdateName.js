import React, { useState, useEffect } from 'react'
import UpdateUserInput from '../../components/SettingsComponents/UpdateUserInput'
import { useNavigate } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'

const UpdateName = () => {
  const { updateUserData, currUserData } = useAuth()
  const { name } = currUserData
  const navigate = useNavigate()

  const [userName, setUserName] = useState(name)

  useEffect(() => {
    if (userName !== '' && userName !== name) {
      const payload = { prop: 'name', val: userName }
      updateUserData(payload)
        .then(() => {
          console.log('hello there')
          navigate(-1)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [userName])

  return (
    <div className='update-name-page page'>
      <div className='settings-title'>Name</div>
      <UpdateUserInput
        placeholder={'Enter Updated Name'}
        val={userName}
        setVal={setUserName}
        maxCharacters={30}
      />
    </div>
  )
}

export default UpdateName
