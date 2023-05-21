import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from './Login'
import * as MockResponses from '../../test-helpers/MockFetchResponses'


describe('Login Use Cases.', () => {
  const mockSaveUser = jest.fn()

  test('Clicking submit with VALID credentials should save user to application method.', async () => {
    const credentials = {
      "username": "username",
      "password": "password"
    }
    render(<Login setToken={mockSaveUser} />);

    jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve(MockResponses.MockOk());
    })

    userEvent.type(screen.getByPlaceholderText('User Name / Email'), 'username')
    userEvent.type(screen.getByPlaceholderText('password'), 'password')
    userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    expect(window.fetch).toHaveBeenCalledWith(
      'http://big12pickem.com/rpc/user/get/user.asp',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    )
    expect(window.fetch).toHaveBeenCalledTimes(1)
    await mockSaveUser()
    expect(mockSaveUser).toHaveBeenCalledTimes(1)
  })

  test('Clicking submit with INVALID credentials should tell user "Sorry".', async () => {
    const credentials = {
      "username": "username",
      "password": "password"
    }
    render(<Login setToken={mockSaveUser} />);
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve(MockResponses.MockUnauthorized());
    });

    userEvent.type(screen.getByPlaceholderText('User Name / Email'), 'username')
    userEvent.type(screen.getByPlaceholderText('password'), 'password')
    userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    expect(window.fetch).toHaveBeenCalledWith(
      'http://big12pickem.com/rpc/user/get/user.asp',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    )
    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(await screen.findByText(/sorry/i)).toBeInTheDocument()
  })

  test('Not filling out user name of password should tell user either field is blank.', () => {
    render(<Login setToken={mockSaveUser} />)
    userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    expect(screen.getByText(/user name is blank/i)).toBeInTheDocument()
    expect(screen.getByText(/password is blank/i)).toBeInTheDocument()
  })
})

describe('Sign Up Use Cases.', () => {
  const mockSaveUser = jest.fn()
  const user =
  {
    "username": "username",
    "firstName": "firstname",
    "lastName": "lastname",
    "password": "password"
  }

  test('Signing up with VALID user values creates new user.', async () => {
    render(<Login setToken={mockSaveUser} />)
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve(MockResponses.MockOk());
    });

    userEvent.click(screen.getByText(/sign up/i))
    userEvent.type(screen.getByPlaceholderText('User Name / Email'), 'username')
    userEvent.type(screen.getByPlaceholderText('First name'), 'firstname')
    userEvent.type(screen.getByPlaceholderText('Last name'), 'lastname')
    userEvent.type(screen.getByPlaceholderText('password'), 'password')
    userEvent.type(screen.getByPlaceholderText('confirm password'), 'password')
    userEvent.click(screen.getByRole('button', { name: /sign up/i }))

    expect(window.fetch).toHaveBeenCalledWith(
      'http://big12pickem.com/rpc/user/post/user.asp',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(user)
      })
    )
    expect(window.fetch).toHaveBeenCalledTimes(1)
    await mockSaveUser()
    expect(mockSaveUser).toHaveBeenCalledTimes(1)
  })

  test('Signing up with a user name that is already taken tells the user.', async () => {
    render(<Login setToken={mockSaveUser} />)
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve(MockResponses.MockConflict());
    });

    userEvent.click(screen.getByText(/sign up/i))
    userEvent.type(screen.getByPlaceholderText('User Name / Email'), 'username')
    userEvent.type(screen.getByPlaceholderText('First name'), 'firstname')
    userEvent.type(screen.getByPlaceholderText('Last name'), 'lastname')
    userEvent.type(screen.getByPlaceholderText('password'), 'password')
    userEvent.type(screen.getByPlaceholderText('confirm password'), 'password')
    userEvent.click(screen.getByRole('button', { name: /sign up/i }))

    expect(window.fetch).toHaveBeenCalledWith(
      'http://big12pickem.com/rpc/user/post/user.asp',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(user)
      })
    )
    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(await screen.findByText(/user name already exists/i)).toBeInTheDocument()
  })

  test('Not filling out all the "sign up" fields should let the user name which are blank', () => {
    render(<Login setToken={mockSaveUser} />)

    userEvent.click(screen.getByText(/sign up/i))
    userEvent.click(screen.getByRole('button', { name: /sign up/i }))

    expect(screen.getByText(/user name is blank/i)).toBeInTheDocument()
    expect(screen.getByText(/first name is blank/i)).toBeInTheDocument()
    expect(screen.getByText(/last name is blank/i)).toBeInTheDocument()
    expect(screen.getByText(/password is blank/i)).toBeInTheDocument()
    expect(screen.getByText(/password confirmation is blank/i)).toBeInTheDocument()
  })

  test('A user name or password that is too short should let the user know', () => {
    render(<Login setToken={mockSaveUser} />)

    userEvent.click(screen.getByText(/sign up/i))
    userEvent.type(screen.getByPlaceholderText(/user name \/ email/i), 'usern')
    userEvent.type(screen.getByPlaceholderText('password'), 'passw')
    userEvent.click(screen.getByRole('button', { name: /sign up/i }))

    expect(screen.getByText(/user name must be at least 6 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
  })

  test('A password that does not match the password confirmation should let the user know', () => {
    render(<Login setToken={mockSaveUser} />)

    userEvent.click(screen.getByText(/sign up/i))
    userEvent.type(screen.getByPlaceholderText('User Name / Email'), 'username')
    userEvent.type(screen.getByPlaceholderText('First name'), 'firstname')
    userEvent.type(screen.getByPlaceholderText('Last name'), 'lastname')
    userEvent.type(screen.getByPlaceholderText('password'), 'password')
    userEvent.type(screen.getByPlaceholderText('confirm password'), 'Xpassword')
    userEvent.click(screen.getByRole('button', { name: /sign up/i }))

    expect(screen.getByText(/does not match/i)).toBeInTheDocument()
  })
})

describe('Toggling between log in and sign up', () => {
  const mockSaveUser = jest.fn()

  test('Toggle from "Log In" to "Sign Up" should show "Sign Up" screen.', () => {
    render(<Login setToken={mockSaveUser} />)

    userEvent.click(screen.getByText(/sign up/i))

    expect(screen.getByText(/sign in/i)).toBeInTheDocument()
  })

  test('Toggle from "Log In" to "Sign Up" to "Log In" should show "Log In" screen.', () => {
    render(<Login setToken={mockSaveUser} />)

    userEvent.click(screen.getByText(/sign up/i))
    userEvent.click(screen.getByText(/sign in/i))

    expect(screen.getByText(/sign up/i)).toBeInTheDocument()
  })
})