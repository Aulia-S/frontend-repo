import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Auth } from '@/types/Auth'
import { RootState } from '../root-reducer'

interface AuthState {
  user: Auth | null
}

const initialState: AuthState = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload
    },
    removeAuth: (state) => {
      state.user = null
    },
  },
})

export const { setAuth, removeAuth } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
