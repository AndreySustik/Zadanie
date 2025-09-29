import React, { useState, useEffect } from 'react'

const UserForm = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        age: user.age || ''
      })
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>{user ? 'Редактировать пользователя' : 'Добавить пользователя'}</h2>
      
      <div>
        <label>Имя:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Возраст:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>

      <div>
        <button type="submit">
          {user ? 'Обновить' : 'Создать'}
        </button>
        {user && (
          <button type="button" onClick={onCancel}>
            Отмена
          </button>
        )}
      </div>
    </form>
  )
}

export default UserForm