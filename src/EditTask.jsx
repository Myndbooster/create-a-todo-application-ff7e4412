import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditTask() {
  const { id } = useParams();
  const [task, setTask] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`/api/tasks/${id}`);
      const data = await response.json();
      setTask(data);
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (response.ok) {
      navigate(`/tasks/${id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-2xl mb-4">Edit Task</h1>
      <input className="border rounded mb-2 p-2 w-full" placeholder="Task Title" value={task.title} onChange={e => setTask({ ...task, title: e.target.value })} required />
      <textarea className="border rounded mb-2 p-2 w-full" placeholder="Task Description" value={task.description} onChange={e => setTask({ ...task, description: e.target.value })} required></textarea>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Task</button>
    </form>
  );
}

export default EditTask;