import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Task List</h1>
      <Link to="/tasks/add" className="bg-green-500 text-white px-4 py-2 rounded">Add Task</Link>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="border-b border-gray-300 py-2">
            <Link to={`/tasks/${task.id}`}>{task.title}</Link>
            <Link to={`/tasks/edit/${task.id}`} className="ml-4 bg-yellow-400 text-white px-2 py-1 rounded">Edit</Link>
          </li>
        ))} 
      </ul>
    </div>
  );
}

export default TaskList;