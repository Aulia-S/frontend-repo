import authReducer from './auth/authSlice'
import { combineReducers } from '@reduxjs/toolkit'
import { baseApi } from './base-api'

const rootReducer = combineReducers({
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
