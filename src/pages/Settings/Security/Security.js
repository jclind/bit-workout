import React from 'react'
import SettingsSectionTitle from '../../../components/SettingsComponents/SettingsSectionTitle/SettingsSectionTitle'
import FormInput from '../../../components/FormInput/FormInput'
import BackButton from '../../../components/SettingsComponents/BackButton/BackButton'
import { TailSpin } from 'react-loader-spinner'
import './Security.scss'

const Security = ({
  oldPass,
  setOldPass,
  newPass,
  setNewPass,
  repNewPass,
  setRepNewPass,
  showPassword,
  setShowPassword,
  handlePasswordSubmit,
  passMatches,
  loading,
  error,
}) => {
  return (
    <div className='security-page page'>
      <div className='settings-title'>Security</div>
      <section className='settings-section change-password-section'>
        <SettingsSectionTitle text={'change password'} />
        {error && <div className='error-text'>{error}</div>}
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
            error={!passMatches}
          />
          <FormInput
            placeholder='Repeat New Password'
            val={repNewPass}
            setVal={setRepNewPass}
            inputType={showPassword ? 'text' : 'password'}
            required={true}
            error={!passMatches}
          />
          <div
            className='show-passwords-btn'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide Passwords' : 'Show Passwords'}
          </div>
          <button className='submit-btn' disabled={loading}>
            {loading ? (
              <TailSpin
                height='25'
                width='25'
                color='white'
                arialLabel='loading'
                className='spinner'
              />
            ) : (
              'Reset'
            )}
          </button>
        </form>
      </section>
      <BackButton />
    </div>
  )
}

export default Security
