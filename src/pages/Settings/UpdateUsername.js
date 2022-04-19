import React, { useState, useEffect } from 'react'
import UpdateUserInput from '../../components/SettingsComponents/UpdateUserInput/UpdateUserInput'
import { useNavigate } from 'react-router'
import { connect } from 'react-redux'
import { updateUserAccountData } from '../../redux/actions/auth/authStatus'

const UpdateUsername = ({ updateUserAccountData, userAccountData }) => {
  const { username } = userAccountData
  const navigate = useNavigate()

  const [newUsername, setNewUsername] = useState(username)

  useEffect(() => {
    if (newUsername !== '' && newUsername !== username) {
      const payload = { prop: 'username', val: newUsername }
      updateUserAccountData(payload)
        .then(() => {
          console.log('hello there')
          navigate(-1)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [newUsername, username, updateUserAccountData, navigate])

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

const mapStateToProps = state => {
  return {
    userAccountData: state.auth.userAccountData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateUserAccountData: data => dispatch(updateUserAccountData(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUsername)
