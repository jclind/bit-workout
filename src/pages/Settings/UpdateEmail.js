import React, { useState, useEffect } from 'react'
import UpdateUserInput from '../../components/SettingsComponents/UpdateUserInput/UpdateUserInput'
import { useNavigate } from 'react-router'
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
          console.log('hello there')
          navigate(-1)
        })
        .catch(err => {
          console.log(err)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newEmail, email, navigate, updateEmail])

  return (
    <div className='update-name-page page'>
      <div className='settings-title'>Email</div>
      <div className='error'>{error}</div>
      <UpdateUserInput
        placeholder={'Enter New Email'}
        val={newEmail}
        setVal={setNewEmail}
        maxCharacters={30}
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
