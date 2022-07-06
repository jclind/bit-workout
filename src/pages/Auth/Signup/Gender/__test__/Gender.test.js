import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Gender from '../Gender'

const MockGender = () => {
  return (
    <BrowserRouter>
      <Gender />
    </BrowserRouter>
  )
}

describe('Gender', () => {
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
    render(<MockGender />)
    const pageTitle = screen.getByText(/Gender/i)
    expect(pageTitle).toBeInTheDocument()
  })
  it('Should only select one option at a time', () => {
    render(<MockGender />)
    const femaleBtn = screen.getByRole('button', { name: 'Female' })
    const maleBtn = screen.getByRole('button', { name: 'Male' })

    fireEvent.click(femaleBtn)

    expect(femaleBtn.classList.contains('selected')).toBe(true)
    expect(maleBtn.classList.contains('selected')).toBe(false)
  })
  it('Should call localStorage getItem on render', () => {
    render(<MockGender />)
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1)
  })
  it('Should not submit saveSignupData if no value is selected', () => {
    render(<MockGender />)
    const nextBtn = screen.getByRole('button', { name: 'NEXT' })

    fireEvent.click(nextBtn)
    expect(saveSignupData).toHaveBeenCalledTimes(0)
  })
  it('Should call saveSignupData to be called on submit with a gender option selected', async () => {
    render(<MockGender />)
    const maleBtn = screen.getByRole('button', { name: 'Male' })
    const nextBtn = screen.getByRole('button', { name: 'NEXT' })

    fireEvent.click(maleBtn)

    setTimeout(function () {
      // expect something that's available after the timeout
      fireEvent.click(nextBtn)
      expect(saveSignupData).toHaveBeenCalledTimes(1)
      expect(saveSignupData).toHaveBeenCalledWith('gender', '"Male"')
    }, 500)
  })
})
