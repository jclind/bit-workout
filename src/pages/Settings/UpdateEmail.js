import React, { useState, useEffect } from 'react'
import UpdateUserInputContainer from '../../components/SettingsComponents/UpdateUserInput/UpdateUserInputContainer'
import { useNavigate } from 'react-router'
import { AiOutlineWarning } from 'react-icons/ai'
import { connect } from 'react-redux'
import { handleUpdateEmail } from '../../redux/actions/auth/authStatus'
import FormInput from '../../components/FormInput/FormInput'
import { toast } from 'react-toastify'

const UpdateEmail = ({ updateEmail, userAuth }) => {
  const { email } = userAuth
  const [newEmail, setNewEmail] = useState(email)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (newEmail && !password) return setError('Please Enter Password')
    console.log(newEmail, email)
    if (newEmail !== '' && newEmail !== email && password) {
      updateEmail(newEmail, password)
        .then(() => {
          toast('Email Changed Successfully', { type: 'success' })
          navigate(-1)
        })
        .catch(err => {
          setNewEmail(email)
          setError(err.message)
        })
    } else {
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
