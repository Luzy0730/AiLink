import React from 'react';
import { Navigate } from 'react-router-dom';
const Home = React.lazy(() => import('@/pages/home/index.jsx'));
const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/*',
    element: <Navigate to="/" />,
  },
];

export default routes;
