

import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [editInput, setEditInput] = useState('');

  const handleAdd = (e) => {
    setInput(e.target.value);
  };

  const handleFix = () => {
    if (input.trim()) {
      setTodo((todo) => [...todo, input]);
      setInput('');
    }
  };

  const handleDelete = (index) => {
    setTodo((todo) => todo.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setCurrentIndex(index);
    setEditInput(todo[index]);
  };

  const handleEditInput = (e) => {
    setEditInput(e.target.value);
  };

  const handleConfirmEdit = () => {
    setTodo((todo) => {
      const newTodo = [...todo];
      newTodo[currentIndex] = editInput;
      return newTodo;
    });
    setIsEditing(false);
    setCurrentIndex(null);
    setEditInput('');
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <input
        type='text'
        placeholder='Add a new task'
        value={input}
        onChange={handleAdd}
        className="input-field"
      />
      <button onClick={handleFix} className="add-button">Add</button>
      {todo.length === 0 && <p className="no-todos">No tasks to show</p>}
      <ul className="todo-list">
        {todo.map((item, index) => (
          <li key={index} className="todo-item">
            {isEditing && currentIndex === index ? (
              <div className="edit-container">
                <input
                  type='text'
                  value={editInput}
                  onChange={handleEditInput}
                  className="edit-input"
                />
                <button onClick={handleConfirmEdit} className="confirm-button">Confirm</button>
              </div>
            ) : (
              <div className="item-container">
                <h2>{item}</h2>
                <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
                <button onClick={() => handleEdit(index)} className="edit-button">Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;



