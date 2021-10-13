import { useState } from 'react'

interface IUser {
  FirstName: string;
  LastName: string;
  UserId: string;
  UserName: string;
}
export default function useUser() {
  const getUserId = () => {
    const userString: string = sessionStorage.getItem('user')
    const user: IUser = JSON.parse(userString)
    return user?.UserId
  }

  const [userId, setUserId] = useState(getUserId)

  const saveUser = (user: IUser) => {
    sessionStorage.setItem('user', JSON.stringify(user))
    setUserId(user.UserId)
  }

  const clearUser = () => {
    sessionStorage.removeItem('user')
    setUserId('')
  }

  return {
    setUserId: saveUser,
    userId,
    clearUserId: clearUser
  }
}