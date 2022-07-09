import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import EmailSignup from '../EmailSignup'
import { Provider } from 'react-redux'

const MockEmailSignup = () => {
  const store = { getState: jest.fn(), subscribe: jest.fn() }
  return (
    <Provider store={store}>
      <BrowserRouter>
        <EmailSignup />
      </BrowserRouter>
    </Provider>
  )
}

jest.mock('../../../../../redux/actions/auth/authStatus', () => ({
  signupWithEmail: jest.fn(() => null),
}))

const typeIntoInput = async ({ name, email, password }) => {
  const nameInput = screen.getByPlaceholderText(/full name/i)
  if (name) {
    await userEvent.type(nameInput, name)
  }
  const emailInput = screen.getByPlaceholderText(/email/i)
  if (email) {
    await userEvent.type(emailInput, email)
  }
  const passwordInput = screen.getByPlaceholderText(/password/i)
  if (password) {
    await userEvent.type(passwordInput, password)
  }

  return { nameInput, emailInput, passwordInput }
}

describe('EmailSignup', () => {
  it('Should render username page', () => {
    render(<MockEmailSignup />)
    const pageTitle = screen.getByText(/Create Account/i)
    const nameInput = screen.getByPlaceholderText(/full name/i)
    const emailInput = screen.getByPlaceholderText(/email/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const signupBtn = screen.getByText(/sign up/i)

    expect(pageTitle).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(signupBtn).toBeInTheDocument()
  })

  describe('Signup form input testing', () => {
    it('Should not allow more than 30 characters in name input', async () => {
      render(<MockEmailSignup />)
      const strWith31Chars = '123456789abcdefghijklmnopqrstuv'
      const { nameInput } = typeIntoInput({ name: strWith31Chars })

      expect(nameInput).toHaveValue(strWith31Chars.slice(0, 30))
    })
  })
})
