import React, { memo, useLayoutEffect, useState } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import routes from './router/index';
import { AppWrapper } from './style';
import Footer from '@/components/footer';
import Header from '@/components/header';

const App = memo(() => {
  const location = useLocation()
  const [showlayout, setShowlayout] = useState(false)
  useLayoutEffect(() => {
    setShowlayout(['/'].includes(location.pathname))
  }, [location])
  return (
    <AppWrapper showlayout={showlayout.toString()}>
      {showlayout && <Header />}
      <div className={`page ${showlayout ? '' : 'center'}`}>{useRoutes(routes)}</div>
      {showlayout && <Footer />}
    </AppWrapper >
  )
});

export default App;
