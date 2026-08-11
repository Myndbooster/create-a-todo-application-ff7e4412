import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    if (response.ok) {
      navigate('/tasks');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-2xl mb-4">Add New Task</h1>
      <input className="border rounded mb-2 p-2 w-full" placeholder="Task Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea className="border rounded mb-2 p-2 w-full" placeholder="Task Description" value={description} onChange={e => setDescription(e.target.value)} required></textarea>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
    </form>
  );
}

export default AddTask;