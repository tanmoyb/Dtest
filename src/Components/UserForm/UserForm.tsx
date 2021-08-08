import React, { useState } from 'react'

interface Props {
  content?: string;
}

const regExp = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)
const API_HOST = 'http://localhost:4000'
const INVENTORY_API_URL = `${API_HOST}/inventory`

const UserForm: React.FC<Props> = ({}): React.ReactElement => {
  const INITIAL_STATE = {
    name: '',
    email: '',
    phoneNumer: ''
  }
  const [isError, setIsError] = useState(INITIAL_STATE)
  const [inputValue, setInputValue] = useState({})

  const [valid, setValid] = useState(true)

  const formValid = (): void => {
    Object.values(isError).forEach((val) => {
      if (val.length > 0) {
        setValid(false)
      } else {
        setValid(true)
      }
    })
  }

  const onSubmit = (e: any): void => {
    e.preventDefault()
    formValid()
    if (valid) {
      // eslint-disable-next-line no-console
      console.log('value', inputValue)
      updateInventory(inputValue)
    } else {
      // eslint-disable-next-line no-console
      console.log('Form is invalid!')
    }
  }

  const formValChange = (e: any): void => {
    e.preventDefault()
    const { name, value } = e.target

    switch (name) {
      case 'name':
        const nameError =
          value.length < 4 ? 'Atleast 4 characaters required' : ''
        setIsError({
          ...isError,
          name: nameError
        })
        break
      case 'email':
        const emailError = regExp.test(value) ? '' : 'Email address is invalid'
        setIsError({
          ...isError,
          email: emailError
        })
        break
      case 'phoneNumer':
        const phoneNumerError =
          value.length < 6 ? 'Atleast 6 characaters required' : ''
        setIsError({
          ...isError,
          phoneNumer: phoneNumerError
        })
        break
      default:
        break
    }
    setInputValue({
      ...inputValue,
      [name]: value
    })
  }
  // eslint-disable-next-line no-console
  console.log('inputValue', inputValue)

  const updateInventory = (value): void => {
    // eslint-disable-next-line no-console
    console.log('unit price', value)
    fetch(`${INVENTORY_API_URL}`, {
      method: 'POST',
      body: JSON.stringify({
        name: value.name,
        email: value.email,
        phoneNumber: value.phoneNumber
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
  }

  return (
    <>
      <form onSubmit={onSubmit} noValidate>
        <div className='form-group'>
          <label>Name</label>
          <input
            type='text'
            className={
              isError.name.length > 0
                ? 'is-invalid form-control'
                : 'form-control'
            }
            name='name'
            onChange={formValChange}
          />
          {isError.name.length > 0 && (
            <span className='invalid-feedback'>{isError.name}</span>
          )}
        </div>

        <div className='form-group'>
          <label>Email</label>
          <input
            type='email'
            className={
              isError.email.length > 0
                ? 'is-invalid form-control'
                : 'form-control'
            }
            name='email'
            onChange={formValChange}
          />
          {isError.email.length > 0 && (
            <span className='invalid-feedback'>{isError.email}</span>
          )}
        </div>

        <div className='form-group'>
          <label>phoneNumber</label>
          <input
            type='text'
            className={
              isError.phoneNumer.length > 0
                ? 'is-invalid form-control'
                : 'form-control'
            }
            name='phoneNumber'
            onChange={formValChange}
          />
          {isError.phoneNumer.length > 0 && (
            <span className='invalid-feedback'>{isError.phoneNumer}</span>
          )}
        </div>

        <button type='submit' className='btn btn-block btn-danger'>
          Create User
        </button>
      </form>
    </>
  )
}

export default UserForm
