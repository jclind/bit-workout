import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SignupSelection from '../SignupSelection'
import { Provider } from 'react-redux'

const MockSignupSelection = () => {
  const store = { getState: jest.fn(), subscribe: jest.fn() }
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SignupSelection />
      </BrowserRouter>
    </Provider>
  )
}

jest.mock('../../../../../redux/actions/auth/authStatus', () => ({
  signupWithGoogle: jest.fn(() => null),
}))

describe('SignupSelection', () => {
  it('Should render signup selection page correctly', () => {
    render(<MockSignupSelection />)
    const pageTitle = screen.getByText(/Last Step!/i)
    const googleBtn = screen.getByRole('button', {
      name: /Continue With Google/i,
    })
    const emailBtn = screen.getByRole('button', {
      name: /Continue With Email/i,
    })

    expect(pageTitle).toBeInTheDocument()
    expect(googleBtn).toBeInTheDocument()
    expect(emailBtn).toBeInTheDocument()
  })
})
