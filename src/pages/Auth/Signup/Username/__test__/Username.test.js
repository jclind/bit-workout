import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Username from '../Username'
import { checkUsernameAvailability } from '../../../../../redux/actions/auth/authStatus'

const MockUsername = () => {
  return (
    <BrowserRouter>
      <Username />
    </BrowserRouter>
  )
}

const clickNextBtn = () => {
  const nextBtn = screen.getByRole('button', { name: 'NEXT' })

  fireEvent.click(nextBtn)
}
const typeIntoUsernameInput = async username => {
  const usernameInput = screen.getByTestId('username')
  await userEvent.type(usernameInput, username)

  return usernameInput
}

jest.mock('../../../../../redux/actions/auth/authStatus', () => ({
  checkUsernameAvailability: jest.fn(value => true),
}))
describe('BarbellWeight', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    })
  })

  it('Should render username page', () => {
    render(<MockUsername />)
    const pageTitle = screen.getByText(/Choose Username/i)
    const usernameInput = screen.getByTestId('username')
    const nextBtn = screen.getByRole('button', { name: 'NEXT' })

    expect(pageTitle).toBeInTheDocument()
    expect(usernameInput).toBeInTheDocument()
    expect(nextBtn).toBeInTheDocument()
  })
  it('Should call localStorage getItem on render', () => {
    render(<MockUsername />)
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1)
  })

  describe('Username input testing', () => {
    it('Should not allow spaces in username input', async () => {
      render(<MockUsername />)

      const usernameInput = await typeIntoUsernameInput(' ')
      expect(usernameInput).toHaveValue('')

      const testString = 'testing spaces'
      await typeIntoUsernameInput(testString)
      expect(usernameInput).toHaveValue('testingspaces')
    })
    it('Should not allow more than 15 characters in username input', async () => {
      render(<MockUsername />)
      const testString = '123456789abcdefh'
      const usernameInput = await typeIntoUsernameInput(testString)
      expect(usernameInput).toHaveValue('123456789abcdefh')
    })
  })
  describe('Validation testing', () => {
    it('Should throw error if input is empty', async () => {
      render(<MockUsername />)

      clickNextBtn()

      const error = screen.getByText(/Username length must be 3 or greater/i)
      expect(error).toBeInTheDocument()
    })
    it('Should throw error if input is less than 3 characters long', async () => {
      render(<MockUsername />)

      await typeIntoUsernameInput('ab')
      clickNextBtn()

      const error = screen.getByText(/Username length must be 3 or greater/i)
      expect(error).toBeInTheDocument()
    })
  })
})
