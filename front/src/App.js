import React, { memo } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './router/index';
import { AppWrapper } from './style';

const App = memo(() => (
  <AppWrapper>
    <div className="app">
      <div className="page">{useRoutes(routes)}</div>
    </div>
  </AppWrapper>
));

export default App;
