import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CustomNotifications } from './pages/customNotifications/CustomNotifications';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <CustomNotifications />
    },
  ]
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
