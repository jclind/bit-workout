import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import SettingsSectionTitle from '../../components/SettingsComponents/SettingsSectionTitle'
import FormInput from '../../components/FormInput'
import '../../assets/styles/pages/security.scss'
import { auth } from '../../firebase'

const Security = () => {
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [repNewPass, setRepNewPass] = useState('')

  const { updatePassword, currentUser } = useAuth()

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [passNotMatch, setPassNotMatch] = useState(false)

  const [showPassword, setShowPassword] = useState()

  const changePasswordForm = useRef()

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
      .then(err => {
        setError('')

        setSuccess('Password Changed')
        setTimeout(() => {
          setSuccess('')
        }, 4000)
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
          ref={changePasswordForm}
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
    </div>
  )
}

export default Security
