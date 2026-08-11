import React from 'react';

function Landing() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-4">Welcome to Todo App</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Log In / Sign Up</button>
    </div>
  );
}

export default Landing;