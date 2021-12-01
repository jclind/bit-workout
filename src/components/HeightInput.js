import React from 'react'
import '../assets/styles/components/height-input.scss'
import { Dropdown } from 'react-bootstrap'

const HeightInput = () => {
    return (
        <>
            <Dropdown className='height-input'>
                <Dropdown.Toggle
                    id='dropdown-basic'
                    className='dropdown-toggle'
                >
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu className='options-container'>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {/* <label className='form-input-label'>
        <select name='height' className='height-input'>
          <optgroup label='ft, in'>
            <option value='' disabled selected className='placeholder'>
              Height
            </option>
            <option value={{ ft: 4, in: 0 }}>4' 0"</option>
            <option value={{ ft: 4, in: 1 }}>4' 1"</option>
            <option value={{ ft: 4, in: 2 }}>4' 2"</option>
            <option value={{ ft: 4, in: 3 }}>4' 3"</option>
            <option value={{ ft: 4, in: 4 }}>4' 4"</option>
            <option value={{ ft: 4, in: 5 }}>4' 5"</option>
            <option value={{ ft: 4, in: 6 }}>4' 6"</option>
            <option value={{ ft: 4, in: 7 }}>4' 7"</option>
            <option value={{ ft: 4, in: 8 }}>4' 8"</option>
            <option value={{ ft: 4, in: 9 }}>4' 9"</option>
            <option value={{ ft: 4, in: 10 }}>4' 10"</option>
            <option value={{ ft: 4, in: 11 }}>4' 11"</option>
            <option value={{ ft: 5, in: 0 }}>5' 0"</option>
            <option value={{ ft: 5, in: 1 }}>5' 1"</option>
            <option value={{ ft: 5, in: 2 }}>5' 2"</option>
            <option value={{ ft: 5, in: 3 }}>5' 3"</option>
            <option value={{ ft: 5, in: 4 }}>5' 4"</option>
            <option value={{ ft: 5, in: 5 }}>5' 5"</option>
            <option value={{ ft: 5, in: 6 }}>5' 6"</option>
            <option value={{ ft: 5, in: 7 }}>5' 7"</option>
            <option value={{ ft: 5, in: 8 }}>5' 8"</option>
            <option value={{ ft: 5, in: 9 }}>5' 9"</option>
            <option value={{ ft: 5, in: 10 }}>5' 10"</option>
            <option value={{ ft: 5, in: 11 }}>5' 11"</option>
            <option value={{ ft: 6, in: 0 }}>6' 0"</option>
            <option value={{ ft: 6, in: 1 }}>6' 1"</option>
            <option value={{ ft: 6, in: 2 }}>6' 2"</option>
            <option value={{ ft: 6, in: 3 }}>6' 3"</option>
            <option value={{ ft: 6, in: 4 }}>6' 4"</option>
            <option value={{ ft: 6, in: 5 }}>6' 5"</option>
            <option value={{ ft: 6, in: 6 }}>6' 6"</option>
            <option value={{ ft: 6, in: 7 }}>6' 7"</option>
            <option value={{ ft: 6, in: 8 }}>6' 8"</option>
            <option value={{ ft: 6, in: 9 }}>6' 9"</option>
            <option value={{ ft: 6, in: 10 }}>6' 10"</option>
            <option value={{ ft: 6, in: 11 }}>6' 11"</option>
            <option value={{ ft: 7, in: 0 }}>7' 0"</option>
            <option value={{ ft: 7, in: 1 }}>7' 1"</option>
            <option value={{ ft: 7, in: 2 }}>7' 2"</option>
            <option value={{ ft: 7, in: 3 }}>7' 3"</option>
            <option value={{ ft: 7, in: 4 }}>7' 4"</option>
            <option value={{ ft: 7, in: 5 }}>7' 5"</option>
            <option value={{ ft: 7, in: 6 }}>7' 6"</option>
            <option value={{ ft: 7, in: 7 }}>7' 7"</option>
            <option value={{ ft: 7, in: 8 }}>7' 8"</option>
            <option value={{ ft: 7, in: 9 }}>7' 9"</option>
            <option value={{ ft: 7, in: 10 }}>7' 10"</option>
            <option value={{ ft: 7, in: 11 }}>7' 11"</option>
            <option value={{ ft: 8, in: 0 }}>8' 0"</option>
            <option value={{ ft: 8, in: 1 }}>8' 1"</option>
            <option value={{ ft: 8, in: 2 }}>8' 2"</option>
            <option value={{ ft: 8, in: 3 }}>8' 3"</option>
            <option value={{ ft: 8, in: 4 }}>8' 4"</option>
            <option value={{ ft: 8, in: 5 }}>8' 5"</option>
            <option value={{ ft: 8, in: 6 }}>8' 6"</option>
            <option value={{ ft: 8, in: 7 }}>8' 7"</option>
            <option value={{ ft: 8, in: 8 }}>8' 8"</option>
            <option value={{ ft: 8, in: 9 }}>8' 9"</option>
            <option value={{ ft: 8, in: 10 }}>8' 10"</option>
            <option value={{ ft: 8, in: 11 }}>8' 11"</option>
          </optgroup>
        </select>
      </label> */}
        </>
    )
}

export default HeightInput
