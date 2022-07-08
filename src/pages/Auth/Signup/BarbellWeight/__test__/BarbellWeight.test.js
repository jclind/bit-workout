import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import BarbellWeight from '../BarbellWeight'

const MockBarbellWeight = () => {
  return (
    <BrowserRouter>
      <BarbellWeight />
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

  it('Should render birthday page', () => {
    render(<MockBarbellWeight />)
    const pageTitle = screen.getByText(/Barbell Weight/i)
    const weightInput = screen.getByTestId('weight')
    const nextBtn = screen.getByRole('button', { name: 'NEXT' })

    expect(pageTitle).toBeInTheDocument()
    expect(weightInput).toBeInTheDocument()
    expect(nextBtn).toBeInTheDocument()
  })
  it('Should call localStorage getItem on render', () => {
    render(<MockBarbellWeight />)
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1)
  })

  describe('Weight input testing', () => {
    it('Should only allow numbers to be entered', async () => {
      render(<MockBarbellWeight />)

      const testStr = 'testing-=./,;'
      const weightInput = await typeIntoWeightInput(testStr)

      expect(weightInput).toHaveValue('')
    })
    it('Should not allow input less than 1', async () => {
      render(<MockBarbellWeight />)

      const weightInput = await typeIntoWeightInput('0')

      expect(weightInput).toHaveValue('')
    })
    it('Should not allow input more than 55', async () => {
      render(<MockBarbellWeight />)

      const weightInput = await typeIntoWeightInput('56')

      expect(weightInput).toHaveValue('5')
    })
  })

  describe('Validation testing', () => {
    it('Should throw error if input is empty', async () => {
      render(<MockBarbellWeight />)

      clickNextBtn()

      const error = screen.getByText(/Please Enter Weight/i)
      expect(error).toBeInTheDocument()
    })
    it('Should throw error if input is less than 5', async () => {
      render(<MockBarbellWeight />)

      await typeIntoWeightInput('4')
      clickNextBtn()

      const error = screen.getByText(/Please Enter Weight Between 5-55/i)
      expect(error).toBeInTheDocument()
    })
    describe('Should throw error if weight is submitted while not a divisible of 5', () => {
      it('Test: 6', async () => {
        render(<MockBarbellWeight />)

        await typeIntoWeightInput('6')
        clickNextBtn()

        const error = screen.getByText(/Please Enter Value Divisible By 5/i)
        expect(error).toBeInTheDocument()
      })
      it('Test: 7', async () => {
        render(<MockBarbellWeight />)

        await typeIntoWeightInput('7')
        clickNextBtn()

        const error = screen.getByText(/Please Enter Value Divisible By 5/i)
        expect(error).toBeInTheDocument()
      })
      it('Test: 8', async () => {
        render(<MockBarbellWeight />)

        await typeIntoWeightInput('8')
        clickNextBtn()

        const error = screen.getByText(/Please Enter Value Divisible By 5/i)
        expect(error).toBeInTheDocument()
      })
      it('Test: 9', async () => {
        render(<MockBarbellWeight />)

        await typeIntoWeightInput('9')
        clickNextBtn()

        const error = screen.getByText(/Please Enter Value Divisible By 5/i)
        expect(error).toBeInTheDocument()
      })
      it('Test: 44', async () => {
        render(<MockBarbellWeight />)

        await typeIntoWeightInput('44')
        clickNextBtn()

        const error = screen.getByText(/Please Enter Value Divisible By 5/i)
        expect(error).toBeInTheDocument()
      })
      it('Test: 23', async () => {
        render(<MockBarbellWeight />)

        await typeIntoWeightInput('23')
        clickNextBtn()

        const error = screen.getByText(/Please Enter Value Divisible By 5/i)
        expect(error).toBeInTheDocument()
      })
    })
    it('Should not throw error if valid weight is entered, 5', async () => {
      render(<MockBarbellWeight />)

      await typeIntoWeightInput('5')
      clickNextBtn()

      const error = screen.queryByTestId('error')
      expect(error).not.toBeInTheDocument()
    })
    it('45', async () => {
      render(<MockBarbellWeight />)

      await typeIntoWeightInput('45')
      clickNextBtn()

      const error = screen.queryByTestId('error')
      expect(error).not.toBeInTheDocument()
    })
    it('55', async () => {
      render(<MockBarbellWeight />)

      await typeIntoWeightInput('55')
      clickNextBtn()

      const error = screen.queryByTestId('error')
      expect(error).not.toBeInTheDocument()
    })
  })
})
