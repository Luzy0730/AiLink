import { createSlice } from '@reduxjs/toolkit'
const userSlice = createSlice({
  name: 'user',
  initialState: {
    showUserModal: false,
    // 1: 注册 2：登录 3：重置
    userModalMode: 1,
    token: '',
    userInfo: null
  },
  reducers: {
    setShowUserModal(state, action) {
      state.showUserModal = action.payload;
    },
    setUserModalMode(state, action) {
      state.userModalMode = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    }
  }
})

export const { setShowUserModal, setUserModalMode, setToken, setUserInfo } = userSlice.actions
export default userSlice.reducer