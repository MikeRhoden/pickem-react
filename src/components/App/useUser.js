import { useState } from 'react'

export default function useUser() {
    const getUserId = () => {
        const user = sessionStorage.getItem('user')
        const userString = JSON.parse(user)
        return userString?.UserId
    }
    
    const [userId, setUserId] = useState(getUserId)

    const saveUser = (user) => {
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