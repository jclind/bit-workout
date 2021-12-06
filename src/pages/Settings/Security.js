import React, { useState } from 'react'
import SettingsSectionTitle from '../../components/SettingsComponents/SettingsSectionTitle'
import FormInput from '../../components/FormInput'
import '../../assets/styles/pages/security.scss'

const Security = () => {
  const [oldPass, setOldPass] = useState()
  const [newPass, setNewPass] = useState()
  const [repNewPass, setRepNewPass] = useState()

  const [showPassword, setShowPassword] = useState()

  return (
    <div className='security-page page'>
      <div className='settings-title'>Security</div>
      <section className='settings-section change-password-section'>
        <SettingsSectionTitle text={'change password'} />
        <form action='' className='change-password-form'>
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
          />
          <FormInput
            placeholder='Repeat New Password'
            val={repNewPass}
            setVal={setRepNewPass}
            inputType={showPassword ? 'text' : 'password'}
            required={true}
          />
          <div
            className='show-passwords-btn'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide Passwords' : 'Show Passwords'}
          </div>
        </form>
      </section>
    </div>
  )
}

export default Security
