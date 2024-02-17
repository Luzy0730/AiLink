import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import App from './App';
import 'normalize.css';
import './assets/css/index.less';

import store, { persistor } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback="loading...">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <StyleSheetManager shouldForwardProp={isPropValid}>
            <ConfigProvider theme={{ token: { colorPrimary: '#2f4f4f' } }}>
              <App />
            </ConfigProvider>
          </StyleSheetManager>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </Suspense>
);
