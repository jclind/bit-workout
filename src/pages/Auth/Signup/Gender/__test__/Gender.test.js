import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
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
        setItem: jest.fn(() => null),
      },
      writable: true,
    })
  })

  const clickNextBtn = () => {
    const nextBtn = screen.getByRole('button', { name: 'NEXT' })

    fireEvent.click(nextBtn)
  }
  const selectFemaleOption = () => {
    const femaleBtn = screen.getByRole('button', { name: 'Female' })
    fireEvent.click(femaleBtn)

    return { femaleBtn }
  }
  const selectMaleOption = () => {
    const maleBtn = screen.getByRole('button', { name: 'Male' })
    fireEvent.click(maleBtn)

    return { maleBtn }
  }

  it('Should render gender page', () => {
    render(<MockGender />)
    const pageTitle = screen.getByText(/Gender/i)
    const femaleBtn = screen.getByRole('button', { name: 'Female' })
    const maleBtn = screen.getByRole('button', { name: 'Male' })
    const nextBtn = screen.getByRole('button', { name: 'NEXT' })

    expect(pageTitle).toBeInTheDocument()
    expect(femaleBtn).toBeInTheDocument()
    expect(maleBtn).toBeInTheDocument()
    expect(nextBtn).toBeInTheDocument()
  })
  it('Should only select one option at a time', () => {
    render(<MockGender />)

    const maleBtn = screen.getByRole('button', { name: 'Male' })

    const { femaleBtn } = selectFemaleOption()

    expect(femaleBtn.classList.contains('selected')).toBe(true)
    expect(maleBtn.classList.contains('selected')).toBe(false)
  })
  it('Should call localStorage getItem on render', () => {
    render(<MockGender />)
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1)
  })
  it('Should throw error on submit if no gender is selected', () => {
    render(<MockGender />)

    clickNextBtn()

    const error = screen.getByText(/Please Select Gender/i)
    expect(error).toBeInTheDocument()
  })
  it('Should call saveSignupData to be called on submit with a gender option selected', async () => {
    render(<MockGender />)

    selectMaleOption()
    clickNextBtn()

    const error = screen.queryByTestId('error')
    expect(error).not.toBeInTheDocument()
  })
})
