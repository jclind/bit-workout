import React, { useState, useEffect } from 'react'
import UpdateUserInput from '../../components/SettingsComponents/UpdateUserInput/UpdateUserInput'
import { useNavigate } from 'react-router'
import { connect } from 'react-redux'
import { updateEmail } from '../../redux/actions/auth/authStatus'

const UpdateEmail = ({ updateEmail, userAuth }) => {
  const [newEmail, setNewEmail] = useState('test@gmail.com')
  const { email } = userAuth
  const navigate = useNavigate()

  useEffect(() => {
    if (newEmail !== '' && newEmail !== email) {
      updateEmail(newEmail)
        .then(() => {
          console.log('hello there')
          navigate(-1)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [newEmail, email, navigate, updateEmail])

  return (
    <div className='update-name-page page'>
      <div className='settings-title'>Email</div>
      <UpdateUserInput
        placeholder={'Enter Updated Email'}
        val={newEmail}
        setVal={setNewEmail}
        maxCharacters={30}
        input={'email'}
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
    updateEmail: email => dispatch(updateEmail(email)),
  }
}

export default connect(mapStateToProps, mapPropsToDispatch)(UpdateEmail)
