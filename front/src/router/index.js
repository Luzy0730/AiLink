import React, { lazy } from 'react';
import Home from '@/pages/home/index.jsx';
const Link = lazy(() => import('@/pages/link/index.jsx'));
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
