import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import roomSlice from './roomSlice'

const reducer = {
	auth: authSlice,
	room: roomSlice,
}
export const store = configureStore({ reducer })
