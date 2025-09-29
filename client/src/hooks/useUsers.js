import { useState, useEffect } from 'react'
import { userService } from '../services/userService'

export const useUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await userService.getAllUsers()
      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const createUser = async (userData) => {
    try {
      const newUser = await userService.createUser(userData)
      setUsers(prev => [newUser, ...prev])
      return newUser
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const updateUser = async (id, userData) => {
    try {
      const updatedUser = await userService.updateUser(id, userData)
      setUsers(prev => prev.map(user => 
        user.id === id ? updatedUser : user
      ))
      return updatedUser
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const deleteUser = async (id) => {
    try {
      await userService.deleteUser(id)
      setUsers(prev => prev.filter(user => user.id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  }
}