import React, { memo, useLayoutEffect, useState } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { App as AntdApp } from 'antd';
import routes from './router/index';
import { AppWrapper } from './style';
import Footer from '@/components/footer';
import Header from '@/components/header';
import GlobalMessage from '@/utils/GMessage'

const App = memo(() => {
  const location = useLocation()
  const [showlayout, setShowlayout] = useState(false)
  useLayoutEffect(() => {
    setShowlayout(['/'].includes(location.pathname))
  }, [location])
  return (
    <AntdApp>
      <GlobalMessage />
      <AppWrapper showlayout={showlayout.toString()}>
        {showlayout && <Header />}
        <div className={`page ${showlayout ? '' : 'center'}`}>{useRoutes(routes)}</div>
        {showlayout && <Footer />}
      </AppWrapper >
    </AntdApp>
  )
});

export default App;
