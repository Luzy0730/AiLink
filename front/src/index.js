import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import App from './App';
import 'normalize.css';
import './assets/css/index.less';

import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback="loading...">
    <Provider store={store}>
      <HashRouter>
        <ConfigProvider theme={{ token: { colorPrimary: '#2f4f4f' } }}>
          <App />
        </ConfigProvider>
      </HashRouter>
    </Provider>
  </Suspense>
);
