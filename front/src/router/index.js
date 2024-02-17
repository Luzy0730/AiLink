import React from 'react';
import Home from '@/pages/home/index.jsx';
import Link from '@/pages/link/index.jsx';
const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/:short',
    element: <Link />,
  },
];

export default routes;
