import React, { useState, useEffect } from 'react'
import UpdateUserInputContainer from '../../components/SettingsComponents/UpdateUserInput/UpdateUserInputContainer'
import { useNavigate } from 'react-router'
import { AiOutlineWarning } from 'react-icons/ai'
import { connect } from 'react-redux'
import { handleUpdateEmail } from '../../redux/actions/auth/authStatus'
import FormInput from '../../components/FormInput/FormInput'

const UpdateEmail = ({ updateEmail, userAuth }) => {
  const [newEmail, setNewEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { email } = userAuth
  const navigate = useNavigate()

  useEffect(() => {
    if (newEmail && !password) return setError('Please Enter Password')
    if (newEmail !== '' && newEmail !== email && password) {
      updateEmail(newEmail, password)
        .then(() => {
          navigate(-1)
        })
        .catch(err => {
          console.log(err)
          // !ERROR
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newEmail, email, navigate, updateEmail])

  return (
    <div className='update-name-page page'>
      <div className='settings-title'>Email</div>
      {error && (
        <div className='error'>
          <AiOutlineWarning className='icon' />
          {error}
        </div>
      )}
      <UpdateUserInputContainer
        placeholder={'Enter New Email'}
        val={newEmail}
        setVal={setNewEmail}
        input={'email'}
        setError={setError}
      />
      <FormInput
        inputType={'password'}
        val={password}
        setVal={setPassword}
        placeholder='Enter Password'
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userAuth: state.auth.userAuth,
  }
}

const mapPropsToDispatch = dispatch => {
  return {
    updateEmail: (email, password) =>
      dispatch(handleUpdateEmail(email, password)),
  }
}

export default connect(mapStateToProps, mapPropsToDispatch)(UpdateEmail)
