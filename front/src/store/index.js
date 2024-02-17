import { configureStore } from '@reduxjs/toolkit'
import userReducer from './modules/user.store'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['token', 'userInfo']
};
const userPersistedReducer = persistReducer(userPersistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: userPersistedReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    //关闭redux序列化检测
    serializableCheck: false
  })
})

let persistor = persistStore(store);

export default store

export { persistor }