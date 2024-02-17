import React, { memo, useLayoutEffect, useState } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { App as AntdApp } from 'antd';
import routes from './router/index';
import { AppWrapper } from './style';
import Footer from '@/components/footer';
import Header from '@/components/header';
import GlobalMessage from '@/utils/GMessage'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { setToken, setUserInfo } from '@/store/modules/user.store'
import { validate } from '@/apis/user'

const App = memo(() => {
  const dispatch = useDispatch()
  const { token } = useSelector(state => ({
    token: state.user.token,
  }), shallowEqual)
  const location = useLocation()
  const [showlayout, setShowlayout] = useState(false)
  useLayoutEffect(() => {
    setShowlayout(['/'].includes(location.pathname))
    token && validate().then(res => {
      dispatch(setUserInfo(res.data))
    }).catch(err => {
      dispatch(setToken(''))
      dispatch(setUserInfo(null))
    })
  }, [location, dispatch, token])
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
