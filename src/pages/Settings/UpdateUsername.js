import React, { useState, useEffect } from 'react'
import UpdateUserInputContainer from '../../components/SettingsComponents/UpdateUserInput/UpdateUserInputContainer'
import { useNavigate } from 'react-router'
import { AiOutlineWarning } from 'react-icons/ai'
import { connect } from 'react-redux'
import {
  checkUsernameAvailability,
  updateUserAccountData,
} from '../../redux/actions/auth/authStatus'

const UpdateUsername = ({
  updateUserAccountData,
  userAccountData,
  checkUsernameAvailability,
}) => {
  const { username } = userAccountData
  const navigate = useNavigate()

  const [newUsername, setNewUsername] = useState(username)
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
    if (newUsername !== '' && newUsername !== username) {
      const payload = { prop: 'username', val: newUsername }
      checkUsernameAvailability(newUsername).then(checkUsernameAvailability => {
        if (checkUsernameAvailability) {
          updateUserAccountData(payload)
            .then(() => {
              navigate(-1)
            })
            .catch(err => {
              setError(err)
            })
        } else {
          setError('Username taken')
        }
      })
    }
  }, [newUsername, username, updateUserAccountData, navigate])

  return (
    <div className='update-name-page page'>
      <div className='settings-title'>Username</div>
      {error && (
        <div className='error'>
          <AiOutlineWarning className='icon' />
          {error}
        </div>
      )}
      <UpdateUserInputContainer
        placeholder={'Enter Updated Username'}
        val={newUsername}
        setVal={setNewUsername}
        maxCharacters={30}
        setError={setError}
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
    checkUsernameAvailability: username =>
      dispatch(checkUsernameAvailability(username)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUsername)
