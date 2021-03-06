import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Birthday from '../Birthday'

const MockBirthday = () => {
  return (
    <BrowserRouter>
      <Birthday />
    </BrowserRouter>
  )
}

const clickNextBtn = () => {
  const nextBtn = screen.getByRole('button', { name: 'NEXT' })

  fireEvent.click(nextBtn)
}
const typeIntoInput = async ({ month, day, year }) => {
  const monthInput = screen.getByTestId('month')
  if (month) {
    await userEvent.type(monthInput, month)
  }

  const dayInput = screen.getByTestId('day')
  if (day) {
    await userEvent.type(dayInput, day)
  }

  const yearInput = screen.getByTestId('year')
  if (year) {
    await userEvent.type(yearInput, year)
  }

  return { monthInput, dayInput, yearInput }
}

describe('Birthday', () => {
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
    render(<MockBirthday />)
    const pageTitle = screen.getByText(/Date Of Birth/i)
    const monthInput = screen.getByTestId('month')
    const dayInput = screen.getByTestId('day')
    const yearInput = screen.getByTestId('year')
    const nextBtn = screen.getByRole('button', { name: 'NEXT' })

    expect(pageTitle).toBeInTheDocument()
    expect(monthInput).toBeInTheDocument()
    expect(dayInput).toBeInTheDocument()
    expect(yearInput).toBeInTheDocument()
    expect(nextBtn).toBeInTheDocument()
  })
  it('Should call localStorage getItem on render', () => {
    render(<MockBirthday />)
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(3) // One call for each input (month day year)
  })

  describe('Birthday input testing', () => {
    it('Should only allow numbers to be typed into any birthday inputs', async () => {
      render(<MockBirthday />)

      const { monthInput, dayInput, yearInput } = await typeIntoInput({
        month: '',
        day: '',
        year: '',
      })
      expect(monthInput).toHaveValue('')
      expect(dayInput).toHaveValue('')
      expect(yearInput).toHaveValue('')
    })
    it('Should not allow values under 0 in any birthday input', async () => {
      render(<MockBirthday />)

      const { monthInput, dayInput, yearInput } = await typeIntoInput({
        month: '-1',
        day: '-1',
        year: '-1',
      })
      expect(monthInput).toHaveValue('1')
      expect(dayInput).toHaveValue('1')
      expect(yearInput).toHaveValue('1')
    })
    it('Should not allow month input to have a value over 12', async () => {
      render(<MockBirthday />)

      const { monthInput } = await typeIntoInput({ month: '13' })

      expect(monthInput).toHaveValue('1')
      expect(monthInput).not.toHaveValue('13')
    })
    describe('Should add preceding 0 to month value if initial input is 2-9', () => {
      it('Should show 02 in month input if 2 is entered as the first value', async () => {
        render(<MockBirthday />)
        const { monthInput } = await typeIntoInput({ month: '2' })
        expect(monthInput).toHaveValue('02')
      })
      it('Should show 09 in month input if 9 is entered as the first value', async () => {
        render(<MockBirthday />)
        const { monthInput } = await typeIntoInput({ month: '9' })
        expect(monthInput).toHaveValue('09')
      })
    })
    it('Should not allow day input to have a value over 31', async () => {
      render(<MockBirthday />)

      const { dayInput } = await typeIntoInput({ day: '32' })

      expect(dayInput).toHaveValue('3')
      expect(dayInput).not.toHaveValue('32')
    })
    describe('Should add preceding 0 to day value if initial input is 4-9', () => {
      it('Should show 02 in month input if 2 is entered as the first value', async () => {
        render(<MockBirthday />)
        const { dayInput } = await typeIntoInput({ day: '4' })
        expect(dayInput).toHaveValue('04')
      })
      it('Should show 09 in month input if 9 is entered as the first value', async () => {
        render(<MockBirthday />)
        const { dayInput } = await typeIntoInput({ day: '9' })
        expect(dayInput).toHaveValue('09')
      })
    })
    it('Should not allow year input to have value less than 9 years previous to current year', async () => {
      render(<MockBirthday />)

      const maxYear = (new Date().getFullYear() - 9).toString()
      const { yearInput } = await typeIntoInput({ year: maxYear })

      expect(yearInput).toHaveValue(maxYear.substring(0, 3))
      expect(yearInput).not.toHaveValue(maxYear)
    })
  })
  describe('Validation testing', () => {
    const currYear = new Date().getFullYear()

    it('Should throw error if one or all inputs are empty on submit', async () => {
      render(<MockBirthday />)

      clickNextBtn()

      const monthError = screen.getByText(/Please Enter Valid Month/i)
      expect(monthError).toBeInTheDocument()

      await typeIntoInput({ month: '1' })
      clickNextBtn()

      const dayError = screen.getByText(/Please Enter Valid Day/i)
      expect(dayError).toBeInTheDocument()

      await typeIntoInput({ day: '15' })
      clickNextBtn()

      const yearError = screen.getByText(/Please Enter Valid Year/i)
      expect(yearError).toBeInTheDocument()
    })
    it('Should throw error if entered date is not valid', async () => {
      render(<MockBirthday />)

      await typeIntoInput({ month: '2', day: '31', year: '2000' })
      clickNextBtn()

      const error = screen.getByText(/Date Not Valid/i)
      expect(error).toBeInTheDocument()
    })
    it('Should throw error if year is before 100 years from the current year', async () => {
      render(<MockBirthday />)
      const minimumYear = currYear - 101
      await typeIntoInput({
        month: '3',
        day: '1',
        year: minimumYear.toString(),
      })

      clickNextBtn()

      const error = screen.getByText(/Please Enter Year Between/i)
      expect(error).toBeInTheDocument()
    })
    it('Should throw error if year is 9 years or less from the current year', async () => {
      render(<MockBirthday />)
      const minimumYear = currYear - 9
      await typeIntoInput({
        month: '3',
        day: '1',
        year: minimumYear.toString(),
      })

      clickNextBtn()

      const error = screen.getByText(/Please Enter Year Between/i)
      expect(error).toBeInTheDocument()
    })
    it('Should not throw error if year is 100 years before current year', async () => {
      render(<MockBirthday />)
      const minimumYear = currYear - 100
      await typeIntoInput({
        month: '3',
        day: '1',
        year: minimumYear.toString(),
      })

      clickNextBtn()

      const error = screen.queryByTestId('error')
      expect(error).not.toBeInTheDocument()
    })
    it('Should not throw error if year is 10 years before current year', async () => {
      render(<MockBirthday />)
      const minimumYear = currYear - 10
      await typeIntoInput({
        month: '3',
        day: '1',
        year: minimumYear.toString(),
      })

      clickNextBtn()

      const error = screen.queryByTestId('error')
      expect(error).not.toBeInTheDocument()
    })
    describe('Testing variations of valid dates', () => {
      it('Should not throw error if date is 1, 1, currYear - 100', async () => {
        render(<MockBirthday />)

        await typeIntoInput({
          month: '1',
          day: '1',
          year: (currYear - 100).toString(),
        })

        clickNextBtn()
        const error = screen.queryByTestId('error')
        expect(error).not.toBeInTheDocument()
      })
      it('4, 1, currYear - 100', async () => {
        render(<MockBirthday />)

        await typeIntoInput({
          month: '4',
          day: '1',
          year: (currYear - 100).toString(),
        })

        clickNextBtn()
        const error = screen.queryByTestId('error')
        expect(error).not.toBeInTheDocument()
      })
      it('8, 1, currYear - 100', async () => {
        render(<MockBirthday />)

        await typeIntoInput({
          month: '8',
          day: '1',
          year: (currYear - 100).toString(),
        })

        clickNextBtn()
        const error = screen.queryByTestId('error')
        expect(error).not.toBeInTheDocument()
      })
      it('12, 1, currYear - 100', async () => {
        render(<MockBirthday />)

        await typeIntoInput({
          month: '12',
          day: '1',
          year: (currYear - 100).toString(),
        })

        clickNextBtn()
        const error = screen.queryByTestId('error')
        expect(error).not.toBeInTheDocument()
      })
      it('1, 4, currYear - 100', async () => {
        render(<MockBirthday />)

        await typeIntoInput({
          month: '12',
          day: '1',
          year: (currYear - 100).toString(),
        })

        clickNextBtn()
        const error = screen.queryByTestId('error')
        expect(error).not.toBeInTheDocument()
      })
      it('1, 15, currYear - 100', async () => {
        render(<MockBirthday />)

        await typeIntoInput({
          month: '12',
          day: '1',
          year: (currYear - 100).toString(),
        })

        clickNextBtn()
        const error = screen.queryByTestId('error')
        expect(error).not.toBeInTheDocument()
      })
      it('12, 24, currYear - 100', async () => {
        render(<MockBirthday />)

        await typeIntoInput({
          month: '12',
          day: '1',
          year: (currYear - 100).toString(),
        })

        clickNextBtn()
        const error = screen.queryByTestId('error')
        expect(error).not.toBeInTheDocument()
      })
      it('1, 31, currYear - 100', async () => {
        render(<MockBirthday />)

        await typeIntoInput({
          month: '12',
          day: '1',
          year: (currYear - 100).toString(),
        })

        clickNextBtn()
        const error = screen.queryByTestId('error')
        expect(error).not.toBeInTheDocument()
      })
      it('1, 1, currYear - 50', async () => {
        render(<MockBirthday />)

        await typeIntoInput({
          month: '12',
          day: '1',
          year: (currYear - 50).toString(),
        })

        clickNextBtn()
        const error = screen.queryByTestId('error')
        expect(error).not.toBeInTheDocument()
      })
      it('1, 31, currYear - 25', async () => {
        render(<MockBirthday />)

        await typeIntoInput({
          month: '12',
          day: '1',
          year: (currYear - 25).toString(),
        })

        clickNextBtn()
        const error = screen.queryByTestId('error')
        expect(error).not.toBeInTheDocument()
      })
      it('1, 31, currYear - 11', async () => {
        render(<MockBirthday />)

        await typeIntoInput({
          month: '12',
          day: '1',
          year: (currYear - 11).toString(),
        })

        clickNextBtn()
        const error = screen.queryByTestId('error')
        expect(error).not.toBeInTheDocument()
      })
    })
  })
})
