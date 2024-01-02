import React from 'react';
import { Navigate } from 'react-router-dom';
const Layout = React.lazy(() => import('@/pages/layout/index.jsx'));
const Home = React.lazy(() => import('@/pages/home/index.jsx'));
const routes = [
  {
    path: '/',
    element: <Navigate to="/layout" />,
  },
  {
    path: '/layout',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Navigate to="/layout/home" />,
      },
      {
        path: 'home',
        element: <Home />,
      },
    ],
  },
  {
    path: '/*',
    element: <Navigate to="/" />,
  },
];

export default routes;
