import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import filtersReducer from './filtersSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    filters: filtersReducer,
  },
})
