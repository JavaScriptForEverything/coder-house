import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'

const reducer = {
	auth: authSlice
}
export const store = configureStore({ reducer })
