import { createSlice } from '@reduxjs/toolkit'
const userSlice = createSlice({
  name: 'user',
  initialState: {
    showLoginModal: false,
    isLoginMode: true,
  },
  reducers: {
    setShowLoginModal(state, action) {
      state.showLoginModal = action.payload;
    },
    setIsLoginMode(state, action) {
      state.isLoginMode = action.payload;
    },
  }
})

export const { setShowLoginModal, setIsLoginMode } = userSlice.actions
export default userSlice.reducer