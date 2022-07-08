import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Height from '../Height'

const MockHeight = () => {
  return (
    <BrowserRouter>
      <Height />
    </BrowserRouter>
  )
}

const clickNextBtn = () => {
  const nextBtn = screen.getByRole('button', { name: 'NEXT' })

  fireEvent.click(nextBtn)
}
const typeIntoInput = async ({ feet, inches }) => {
  const feetInput = screen.getByTestId('feet')
  if (feet) {
    console.log(feet)
    await userEvent.type(feetInput, feet)
  }

  const inchesInput = screen.getByTestId('inches')
  if (inches) {
    console.log(inches)
    await userEvent.type(inchesInput, inches)
  }

  return { feetInput, inchesInput }
}

describe('Height', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    })
  })

  it('Should render birthday page', () => {
    render(<MockHeight />)
    const pageTitle = screen.getByText(/Height/i)
    const feetInput = screen.getByTestId('feet')
    const inchesInput = screen.getByTestId('inches')
    const nextBtn = screen.getByRole('button', { name: 'NEXT' })

    expect(pageTitle).toBeInTheDocument()
    expect(feetInput).toBeInTheDocument()
    expect(inchesInput).toBeInTheDocument()
    expect(nextBtn).toBeInTheDocument()
  })
  it('Should call localStorage getItem on render', () => {
    render(<MockHeight />)
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(2) // One call for each input (feet, inches)
  })

  describe('Height inputs testing', () => {
    it('Should only allow numbers to be typed in both inputs', async () => {
      render(<MockHeight />)

      const testStr = 'testing-=./,;'
      const { feetInput, inchesInput } = await typeIntoInput({
        feet: testStr,
        inches: testStr,
      })

      expect(feetInput).toHaveValue('')
      expect(inchesInput).toHaveValue('')
    })
    it('Should not allow values under 2 in feet input', async () => {
      render(<MockHeight />)

      const { feetInput } = await typeIntoInput({
        feet: '1',
      })
      await typeIntoInput({
        feet: '-1',
      })
      expect(feetInput).toHaveValue('')
    })
    it('Should not allow values over 8 in feet input', async () => {
      render(<MockHeight />)

      const { feetInput } = await typeIntoInput({
        feet: '9',
      })
      expect(feetInput).toHaveValue('')
    })
    it('Should not allow values under 1 in inches input', async () => {
      render(<MockHeight />)

      const { inchesInput } = await typeIntoInput({
        inches: '0',
      })
      expect(inchesInput).toHaveValue('')
    })
    it('Should not allow values over 11 in inches input', async () => {
      render(<MockHeight />)

      const { inchesInput } = await typeIntoInput({
        inches: '12',
      })
      expect(inchesInput).toHaveValue('1')
    })
  })

  describe('Validation testing', () => {
    it('Should throw error if one or all inputs are empty on submit', async () => {
      render(<MockHeight />)

      clickNextBtn()

      const feetError = screen.getByText(/Please Enter Feet/i)
      expect(feetError).toBeInTheDocument()

      await typeIntoInput({ feet: '5' })
      clickNextBtn()

      const inchesError = screen.getByText(/Please Enter Inches/i)
      expect(inchesError).toBeInTheDocument()
    })
    it('Should not throw error if all inputs are valid, [2, 11]', async () => {
      render(<MockHeight />)

      await typeIntoInput({ feet: '2', inches: '11' })
      clickNextBtn()

      const error = screen.queryByTestId('error')
      expect(error).not.toBeInTheDocument()
    })
    it('Should not throw error if all inputs are valid, [8, 1]', async () => {
      render(<MockHeight />)

      await typeIntoInput({ feet: '8', inches: '1' })
      clickNextBtn()

      const error = screen.queryByTestId('error')
      expect(error).not.toBeInTheDocument()
    })
  })
})
