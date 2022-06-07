import React, { useState, useEffect } from 'react'
import UpdateUserInput from '../../components/SettingsComponents/UpdateUserInput/UpdateUserInput'
import { useNavigate } from 'react-router'
import { connect } from 'react-redux'
import { updateUserAccountData } from '../../redux/actions/auth/authStatus'

const UpdateName = ({ updateUserAccountData, userAccountData }) => {
  const { name } = userAccountData
  const navigate = useNavigate()

  const [userName, setUserName] = useState(name)
  const [error, setError] = useState('')

  useEffect(() => {
    if (userName !== '' && userName !== name) {
      const payload = { prop: 'name', val: userName }
      updateUserAccountData(payload)
        .then(() => {
          navigate(-1)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [userName, name, updateUserAccountData, navigate])

  return (
    <div className='update-name-page page'>
      <div className='settings-title'>Name</div>
      <div className='error'>{error}</div>
      <UpdateUserInput
        placeholder={'Enter Updated Name'}
        val={userName}
        setVal={setUserName}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateName)
