import React, { useState, useEffect } from 'react'
import UpdateUserInputContainer from '../../components/SettingsComponents/UpdateUserInput/UpdateUserInputContainer'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUserAccountData } from '../../redux/actions/auth/authStatus'
import { toast } from 'react-toastify'

const UpdateName = ({ updateUserAccountData, userAccountData }) => {
  const { name } = userAccountData
  const navigate = useNavigate()

  const [userName, setUserName] = useState(name)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (userName !== '' && userName !== name) {
      setLoading(true)
      const payload = { prop: 'name', val: userName }
      updateUserAccountData(payload)
        .then(() => {
          setLoading(false)
          toast('Name Changed Successfully', { type: 'success' })
          navigate(-1)
        })
        .catch(err => {
          setLoading(false)
          setUserName(name)
          setError(err.message)
        })
    }
  }, [userName, name, updateUserAccountData, navigate])

  return (
    <div className='update-name-page page'>
      <div className='settings-title'>Name</div>
      {error && <div className='error'>{error}</div>}
      <UpdateUserInputContainer
        placeholder={'Enter Updated Name'}
        val={userName}
        setVal={setUserName}
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateName)
