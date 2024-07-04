import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Journal from './pages/Journal';
import ToDo from './pages/ToDo';
import Account from './pages/Account';
import MyAccount from './pages/subpages/MyAccount';
import Dashboard from './pages/subpages/Dashboard';
import Settings from './pages/Settings';
import SignUp from './pages/SignUp';
import { Provider } from 'react-redux';
import { store } from './app/store';

const router = createBrowserRouter([
  {
    path: '/',  
    element: <App />
  },
  {
    path: '/Journal',
    element: <Journal /> 
  },
  {
    path: "/ToDo",
    element: <ToDo />
  },
  {
    path: "/Account",
    element: <Account />
  },
  {
    path: "/Account/MyAccount",
    element: <MyAccount />
  },
  {
    path: "/Account/Dashboard",
    element: <Dashboard />
  },
  {
    path: "/Settings",
    element: <Settings />
  },
  {
    path: "/Sign-Up",
    element: <SignUp />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);