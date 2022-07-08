import { render, screen, fireEvent } from '@testing-library/react'
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

describe('Height', () => {})
