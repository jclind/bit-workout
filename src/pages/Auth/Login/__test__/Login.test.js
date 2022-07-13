import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Login from '../Login'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const mockStore = configureStore()

const MockLogin = () => {
  return (
    <Provider store={mockStore({})}>
      <BrowserRouter>
        <Login isSignedIn={jest.fn()} login={jest.fn()} />
      </BrowserRouter>
    </Provider>
  )
}

jest.mock('../../../../redux/actions/auth/authStatus', () => ({
  login: jest.fn(() => null),
}))

const clickLoginBtn = () => {
  const loginBtn = screen.getByTestId('login-btn')
  fireEvent.click(loginBtn)
}

const typeIntoInput = async ({ email, password }) => {
  const emailInput = screen.getByPlaceholderText(/email/i)
  if (email) {
    await userEvent.type(emailInput, email)
  }
  const passwordInput = screen.getByPlaceholderText(/password/i)
  if (password) {
    await userEvent.type(passwordInput, password)
  }

  return { emailInput, passwordInput }
}

describe('Login', () => {
  it('Should render login page', () => {
    render(<MockLogin />)
    const pageTitle = screen.getByTestId('title')
    const emailInput = screen.getByPlaceholderText(/email/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const loginBtn = screen.getByTestId('login-btn')
    const signupLink = screen.getByTestId('sign-up-btn')

    expect(pageTitle).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginBtn).toBeInTheDocument()
    expect(signupLink).toBeInTheDocument()
  })

  it('Should render what is typed in email and password inputs', async () => {
    render(<MockLogin />)
    const { emailInput, passwordInput } = await typeIntoInput({
      email: 'testing',
      password: 'testing',
    })

    expect(emailInput).toHaveValue('testing')
    expect(passwordInput).toHaveValue('testing')
  })
  it('Should throw error if email input is not filled out', () => {
    render(<MockLogin />)

    clickLoginBtn()

    const error = screen.getByText(/Please Enter Email/i)
    expect(error).toBeInTheDocument()
  })
  it('Should throw error if password input is not filled out', async () => {
    render(<MockLogin />)

    await typeIntoInput({ email: 'amongus@gmail.com' })
    clickLoginBtn()

    const error = screen.getByText(/Please Enter Password/i)
    expect(error).toBeInTheDocument()
  })
})
