import React from 'react'
import { Link } from 'react-router-dom'
import loginIMG from '../../../assets/images/login-background.png'
import FormInput from '../../FormInput/FormInput'
import emailIcon from '../../../assets/images/icons/email.svg'
import passwordIcon from '../../../assets/images/icons/password.svg'
import { TailSpin } from 'react-loader-spinner'
import { AiOutlineWarning } from 'react-icons/ai'
// import { FcGoogle } from 'react-icons/fc'
import { connect } from 'react-redux'
// import { signupWithGoogle } from '../../../redux/actions/auth/authStatus'

const Login = ({
  handleSubmit,
  loading,
  error,
  emailVal,
  setEmailVal,
  passwordVal,
  setPasswordVal,
  // signupWithGoogle,
}) => {
  return (
    <>
      <div className='login-container'>
        <img
          src={loginIMG}
          alt='login background'
          className='login-background'
        />
        <div className='title' data-testid='title'>
          Log In
        </div>
        <div className='form-container'>
          {error && (
            <div className='error' data-testid='error'>
              <AiOutlineWarning className='icon' />
              {error}
            </div>
          )}
          <form className='login-form'>
            <div className='inputs'>
              <FormInput
                placeholder='email'
                icon={emailIcon}
                inputType='email'
                val={emailVal}
                setVal={setEmailVal}
                required={true}
                class='login-input'
              />
              <FormInput
                placeholder='password'
                icon={passwordIcon}
                inputType='password'
                val={passwordVal}
                setVal={setPasswordVal}
                required={true}
                class='login-input'
                showPasswordBtn={true}
              />
            </div>

            <Link to='/forgot-password' className='forgot-password'>
              <button className='forgot-password-btn' type='button'>
                Forgot password?
              </button>
            </Link>
            <div className='buttons'>
              <button
                className='submit-btn'
                type='submit'
                onClick={handleSubmit}
                data-testid='login-btn'
                disabled={loading}
              >
                {loading ? (
                  <TailSpin
                    height='30'
                    width='30'
                    color='white'
                    arialLabel='loading'
                    className='spinner'
                  />
                ) : (
                  'Log In'
                )}
              </button>
              {/* <button
                className='google-signup'
                type='button'
                // onClick={signupWithGoogle}
              >
                <FcGoogle className='icon' /> Continue With Google
              </button> */}
              <div className='dont-have-account'>
                Don't have an account?
                <Link
                  to='/signup'
                  className='dont-have-account-btn'
                  data-testid='sign-up-btn'
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    // signupWithGoogle: userData => dispatch(signupWithGoogle(userData)),
  }
}

export default connect(null, mapDispatchToProps)(Login)
