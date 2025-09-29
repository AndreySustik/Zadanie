import React from 'react'

const UserList = ({ users, loading, error, onEdit, onDelete }) => {
  if (loading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка: {error}</div>

  return (
    <div className="user-list">
      <h2>Список пользователей</h2>
      {users.length === 0 ? (
        <p>Пользователи не найдены</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Email</th>
              <th>Возраст</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <button onClick={() => onEdit(user)}>Редактировать</button>
                  <button onClick={() => onDelete(user.id)}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default UserList