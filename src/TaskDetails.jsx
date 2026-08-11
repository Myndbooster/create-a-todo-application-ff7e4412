import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`/api/tasks/${id}`);
      const data = await response.json();
      setTask(data);
    };
    fetchTask();
  }, [id]);

  if (!task) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">{task.title}</h1>
      <p>{task.description}</p>
      <Link to="/tasks" className="bg-gray-500 text-white px-4 py-2 rounded">Back to Task List</Link>
    </div>
  );
}

export default TaskDetails;