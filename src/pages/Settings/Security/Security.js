import React, { useState, useEffect } from 'react'
import SettingsSectionTitle from '../../../components/SettingsComponents/SettingsSectionTitle/SettingsSectionTitle'
import FormInput from '../../../components/FormInput/FormInput'
import './Security.scss'
import { useNavigate } from 'react-router'
import BackButton from '../../../components/SettingsComponents/BackButton/BackButton'
import { connect } from 'react-redux'
import { updatePassword } from '../../../redux/actions/auth/authStatus'

const Security = ({ updatePassword }) => {
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [repNewPass, setRepNewPass] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [passNotMatch, setPassNotMatch] = useState(false)

  const [showPassword, setShowPassword] = useState()

  const navigate = useNavigate()

  const resetPasswordForm = () => {
    setOldPass('')
    setNewPass('')
    setRepNewPass('')
  }

  const handlePasswordSubmit = e => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (newPass !== repNewPass) {
      return setError('New Passwords Must Match')
    } else if (newPass === oldPass) {
      return setError('New Password Must Be Different Than Old.')
    }

    updatePassword(oldPass, newPass)
      .then(() => {
        setError('')

        setSuccess('Password Changed')
        setTimeout(() => {
          setSuccess('')
        }, 4000)
        resetPasswordForm()
        navigate(-1)
      })
      .catch(err => {
        const errCode = err.code
        setSuccess('')

        if (errCode === 'auth/wrong-password') {
          setError('Incorrect Password, Try Again.')
        } else {
          setError('Something went wrong, try re-logging in')
        }
        console.log(err)
      })
  }

  useEffect(() => {
    if (newPass !== repNewPass && repNewPass) {
      return setPassNotMatch(true)
    }
    return setPassNotMatch(false)
  }, [repNewPass, newPass])

  return (
    <div className='security-page page'>
      <div className='settings-title'>Security</div>
      <section className='settings-section change-password-section'>
        <SettingsSectionTitle text={'change password'} />
        {error && <div className='error-text'>{error}</div>}
        {success && <div className='error-text'>{success}</div>}
        <form
          action=''
          className='change-password-form'
          onSubmit={e => handlePasswordSubmit(e)}
          id='currForm'
        >
          <FormInput
            placeholder='Old Password'
            val={oldPass}
            setVal={setOldPass}
            inputType={showPassword ? 'text' : 'password'}
            required={true}
          />
          <FormInput
            placeholder='New Password'
            val={newPass}
            setVal={setNewPass}
            inputType={showPassword ? 'text' : 'password'}
            required={true}
            error={passNotMatch}
          />
          <FormInput
            placeholder='Repeat New Password'
            val={repNewPass}
            setVal={setRepNewPass}
            inputType={showPassword ? 'text' : 'password'}
            required={true}
            error={passNotMatch}
          />
          <div
            className='show-passwords-btn'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide Passwords' : 'Show Passwords'}
          </div>
          <button className='submit-btn'>Reset</button>
        </form>
      </section>
      <BackButton />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    updatePassword: (oldPassword, newPassword) =>
      dispatch(updatePassword(oldPassword, newPassword)),
  }
}

export default connect(null, mapDispatchToProps)(Security)
