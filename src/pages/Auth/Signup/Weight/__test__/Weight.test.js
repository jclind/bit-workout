import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Weight from '../Weight'

const MockWeight = () => {
  return (
    <BrowserRouter>
      <Weight />
    </BrowserRouter>
  )
}

const clickNextBtn = () => {
  const nextBtn = screen.getByRole('button', { name: 'NEXT' })

  fireEvent.click(nextBtn)
}
const typeIntoWeightInput = async weight => {
  const weightInput = screen.getByTestId('weight')
  await userEvent.type(weightInput, weight)

  return weightInput
}

describe('Weight', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    })
  })

  it('Should render weight page', () => {
    render(<MockWeight />)
    const pageTitle = screen.getByText(/Your Weight/i)
    const weightInput = screen.getByTestId('weight')
    const nextBtn = screen.getByRole('button', { name: 'NEXT' })

    expect(pageTitle).toBeInTheDocument()
    expect(weightInput).toBeInTheDocument()
    expect(nextBtn).toBeInTheDocument()
  })
  it('Should call localStorage getItem on render', () => {
    render(<MockWeight />)
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1)
  })

  describe('Weight input testing', () => {
    it('Should only allow numbers to be entered', async () => {
      render(<MockWeight />)

      const testStr = 'testing-=./,;'
      const weightInput = await typeIntoWeightInput(testStr)

      expect(weightInput).toHaveValue('')
    })
    it('Should not allow numbers less than 1', async () => {
      render(<MockWeight />)

      const weightInput = await typeIntoWeightInput('0')

      expect(weightInput).toHaveValue('')
    })
    it('Should not allow numbers over 999', async () => {
      render(<MockWeight />)

      const weightInput = await typeIntoWeightInput('1000')

      expect(weightInput).toHaveValue('100')
    })
    it('Should not allow more than 1 decimal place', async () => {
      render(<MockWeight />)

      const weightInput = await typeIntoWeightInput('150.256')

      expect(weightInput).toHaveValue('150.2')
    })
  })

  describe('Validation testing', () => {
    it('Should throw error if input is empty', async () => {
      render(<MockWeight />)

      clickNextBtn()

      const error = screen.getByText(/Please Enter Weight/i)
      expect(error).toBeInTheDocument()
    })
    it('Should throw error if input is less than 50', async () => {
      render(<MockWeight />)

      await typeIntoWeightInput('49')
      clickNextBtn()

      const error = screen.getByText(/Please Enter Weight Between 50-999/i)
      expect(error).toBeInTheDocument()
    })
    it('Should not throw error if input is 50', async () => {
      render(<MockWeight />)

      await typeIntoWeightInput('50')
      clickNextBtn()

      const error = screen.queryByTestId('error')
      expect(error).not.toBeInTheDocument()
    })
    it('Should not throw error if input is 999', async () => {
      render(<MockWeight />)

      await typeIntoWeightInput('999')
      clickNextBtn()

      const error = screen.queryByTestId('error')
      expect(error).not.toBeInTheDocument()
    })
    it('Should not throw error if input is 541.1', async () => {
      render(<MockWeight />)

      await typeIntoWeightInput('541.1')
      clickNextBtn()

      const error = screen.queryByTestId('error')
      expect(error).not.toBeInTheDocument()
    })
  })
})
