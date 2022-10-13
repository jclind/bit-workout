import React, { useState, useEffect } from 'react'
import UpdateUserInputContainer from '../../components/SettingsComponents/UpdateUserInput/UpdateUserInputContainer'
import { useNavigate } from 'react-router-dom'
import { AiOutlineWarning } from 'react-icons/ai'
import { connect } from 'react-redux'
import {
  checkUsernameAvailability,
  updateUserAccountData,
} from '../../redux/actions/auth/authStatus'
import { toast } from 'react-toastify'

const UpdateUsername = ({ updateUserAccountData, userAccountData }) => {
  const { username } = userAccountData
  const navigate = useNavigate()

  const [newUsername, setNewUsername] = useState(username)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
    if (newUsername !== '' && newUsername !== username) {
      setLoading(true)
      const payload = { prop: 'username', val: newUsername }
      checkUsernameAvailability(newUsername).then(checkUsernameAvailability => {
        if (checkUsernameAvailability) {
          updateUserAccountData(payload)
            .then(() => {
              setLoading(false)
              toast('Username Changed Successfully', { type: 'success' })
              navigate(-1)
            })
            .catch(err => {
              setLoading(false)
              setNewUsername(username)
              setError(err.message)
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
        loading={loading}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUsername)
