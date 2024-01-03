import React, { memo } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './router/index';
import { AppWrapper } from './style';
import Footer from '@/components/footer';
import Header from '@/components/header';

const App = memo(() => (
  <AppWrapper>
    <Header />
    <div className="page">{useRoutes(routes)}</div>
    <Footer />
  </AppWrapper>
));

export default App;
