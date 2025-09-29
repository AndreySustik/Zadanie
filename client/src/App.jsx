import React, { useState } from 'react'
import { useUsers } from './hooks/useUsers'
import UserList from './components/UserList'
import UserForm from './components/UserForm'
import './App.css'

function App() {
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers()
  const [editingUser, setEditingUser] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const handleCreateUser = async (userData) => {
    try {
      await createUser(userData)
      setShowForm(false)
    } catch (err) {
      console.error('Ошибка при создании пользователя:', err)
    }
  }

  const handleUpdateUser = async (userData) => {
    try {
      await updateUser(editingUser.id, userData)
      setEditingUser(null)
    } catch (err) {
      console.error('Ошибка при обновлении пользователя:', err)
    }
  }

  const handleDeleteUser = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      try {
        await deleteUser(id)
      } catch (err) {
        console.error('Ошибка при удалении пользователя:', err)
      }
    }
  }

  const handleEdit = (user) => {
    setEditingUser(user)
  }

  const handleCancelEdit = () => {
    setEditingUser(null)
  }

  return (
    <div className="app">
      <h1>Управление пользователями</h1>
      
      {!showForm && !editingUser && (
        <button onClick={() => setShowForm(true)}>
          Добавить пользователя
        </button>
      )}

      {showForm && !editingUser && (
        <UserForm
          onSubmit={handleCreateUser}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingUser && (
        <UserForm
          user={editingUser}
          onSubmit={handleUpdateUser}
          onCancel={handleCancelEdit}
        />
      )}

      <UserList
        users={users}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDeleteUser}
      />
    </div>
  )
}

export default App