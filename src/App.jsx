import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import TaskList from './TaskList';
import AddTask from './AddTask';
import EditTask from './EditTask';
import TaskDetails from './TaskDetails';
import Settings from './Settings';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tasks" element={isLoggedIn ? <TaskList /> : <Landing />} />
        <Route path="/tasks/add" element={isLoggedIn ? <AddTask /> : <Landing />} />
        <Route path="/tasks/edit/:id" element={isLoggedIn ? <EditTask /> : <Landing />} />
        <Route path="/tasks/:id" element={isLoggedIn ? <TaskDetails /> : <Landing />} />
        <Route path="/settings" element={isLoggedIn ? <Settings /> : <Landing />} />
      </Routes>
    </Router>
  );
}

export default App;