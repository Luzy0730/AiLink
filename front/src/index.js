import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import App from './App';
import 'normalize.css';
import './assets/css/index.less';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback="loading...">
    <HashRouter>
      <ConfigProvider theme={{ token: { colorPrimary: '#2f4f4f' } }}>
        <App />
      </ConfigProvider>
    </HashRouter>
  </Suspense>
);
