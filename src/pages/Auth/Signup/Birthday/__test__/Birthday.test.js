import { render, screen, fireEvent, waitFor } from '@testing-library/react'
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

describe('Birthday', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
      },
      writable: true,
    })
  })
  const saveSignupData = jest.fn()

  it('Should render gender page', () => {
    render(<MockBirthday />)
    const pageTitle = screen.getByText(/Date Of Birth/i)
    expect(pageTitle).toBeInTheDocument()
  })

  describe('Birthday input testing', () => {
    it('Should only allow numbers to be typed into any birthday inputs', async () => {
      render(<MockBirthday />)

      const monthInput = screen.getByTestId('month')
      const dayInput = screen.getByTestId('day')
      const yearInput = screen.getByTestId('year')

      await userEvent.type(monthInput, 'letters')
      expect(monthInput).toHaveValue('')
      await userEvent.type(dayInput, 'letters')
      expect(dayInput).toHaveValue('')
      await userEvent.type(yearInput, 'letters')
      expect(yearInput).toHaveValue('')
    })
    it('Should not allow values under 0 in any birthday input', async () => {
      render(<MockBirthday />)

      const monthInput = screen.getByTestId('month')
      const dayInput = screen.getByTestId('day')
      const yearInput = screen.getByTestId('year')

      await userEvent.type(monthInput, '-1')
      expect(monthInput).toHaveValue('1')
      await userEvent.type(dayInput, '-1')
      expect(dayInput).toHaveValue('1')
      await userEvent.type(yearInput, '-1')
      expect(yearInput).toHaveValue('1')
    })
    it('Should not allow month input to have a value over 12', async () => {
      render(<MockBirthday />)

      const monthInput = screen.getByTestId('month')

      await userEvent.type(monthInput, '13')

      expect(monthInput).toHaveValue('1')
      expect(monthInput).not.toHaveValue('13')
    })
    describe('Should add preceding 0 to month value if initial input is 2-9', () => {
      it('Should show 02 in month input if 2 is entered as the first value', async () => {
        render(<MockBirthday />)
        const monthInput = screen.getByTestId('month')
        await userEvent.type(monthInput, '2')
        expect(monthInput).toHaveValue('02')
      })
      it('Should show 09 in month input if 9 is entered as the first value', async () => {
        render(<MockBirthday />)
        const monthInput = screen.getByTestId('month')
        await userEvent.type(monthInput, '9')
        expect(monthInput).toHaveValue('09')
      })
    })

    it('Should not allow day input to have a value over 31', async () => {
      render(<MockBirthday />)

      const dayInput = screen.getByTestId('day')

      await userEvent.type(dayInput, '32')

      expect(dayInput).toHaveValue('3')
      expect(dayInput).not.toHaveValue('32')
    })
    describe('Should add preceding 0 to day value if initial input is 4-9', () => {
      it('Should show 02 in month input if 2 is entered as the first value', async () => {
        render(<MockBirthday />)
        const dayInput = screen.getByTestId('day')
        await userEvent.type(dayInput, '4')
        expect(dayInput).toHaveValue('04')
      })
      it('Should show 09 in month input if 9 is entered as the first value', async () => {
        render(<MockBirthday />)
        const dayInput = screen.getByTestId('day')
        await userEvent.type(dayInput, '9')
        expect(dayInput).toHaveValue('09')
      })
    })
    it('Should not allow year input to have value less than 9 years previous to current year', async () => {
      render(<MockBirthday />)

      const yearInput = screen.getByTestId('year')

      const maxYear = (new Date().getFullYear() - 9).toString()

      await userEvent.type(yearInput, maxYear)

      expect(yearInput).toHaveValue(maxYear.substring(0, 3))
      expect(yearInput).not.toHaveValue(maxYear)
    })
  })

  describe('Validation testing', () => {
    it('should not call saveSignupData if one or all of the inputs are not filled out', async () => {
      render(<MockBirthday />)

      const nextBtn = screen.getByRole('button', { name: 'NEXT' })

      fireEvent.click(nextBtn)
      expect(saveSignupData).toHaveBeenCalledTimes(0)

      const yearInput = screen.getByTestId('year')
      await userEvent.type(yearInput, '3')

      fireEvent.click(nextBtn)
      expect(saveSignupData).toHaveBeenCalledTimes(0)
    })
  })
})
