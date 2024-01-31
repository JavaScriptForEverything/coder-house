import { createSlice } from '@reduxjs/toolkit';
import { axios } from '../http';
import { API_ORIGIN } from '../http'
import originalAxios from 'axios'

const initialState = {
	loading: false,
	error: '',
	isAuth: false,
	otp: {
		phone: '',
		hash: ''
	},
	user: {
		_id: '',
		phone: '',
		name: '',
		avatar: '',
		createdAt: '',
		isActive: false
	}
}

const { reducer, actions } = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		createRequest: (state, action) => ({ 		// => dispatch( actions.createRequest() )
			...state,
			loading: true,
			error: ''
		}),
		setError: (state, action) => ({ 		// => dispatch( actions.setError({ error: 'error message' }))
			...state,
			loading: false,
			error: action.payload.error
		}),
		setOtp: (state, action) => ({				// => dispatch( actions.setOtp({ phone, otp }))
			...state,
			loading: false,
			error: '',

			otp: {
				phone: action.payload.phone,
				hash: action.payload.hash,
			}
		}),
		setAuth: (state, action) => ({				// => dispatch( actions.setOtp({ isAuth, user }))
			...state,
			loading: false,
			error: '',

			isAuth: !!action.payload.user,
			user: {
				...state.user,
				...action.payload.user,
			}
		}),
		setFullName: (state, action) => ({ 			// => dispatch( actions.setFullName( name ))
			...state,
			user: {
				...state.user,
				name: action.payload
			}
		}),
		setActive: (state, action) => ({				// => dispatch( actions.setOtp({ user }))
			...state,
			loading: false,
			error: '',

			user: {
				...state.user,
				...action.payload.user, 						// => return updated users too
			}
		}),
		setLogout: () => ({											// => dispatch( actions.setLogout())
			...initialState
		}),


	}
})
export default reducer

// /src/steps/stepPhoneEmail.js : => /register
export const getOtp = ({ onNext, phone }) => async (dispatch) => {
	try {
		dispatch( actions.createRequest() )

		const { data: { data } } = await axios.post('/api/auth/send-otp', { phone })
		dispatch( actions.setOtp({ 
			phone: data.phone, 
			hash: data.hash 
		}))

		onNext()
		console.log({ message: data.message })

	} catch (error) {
		dispatch( actions.setError({ error: error.response.data.message }) )
	}
}

// /src/steps/stepOTP.js : => /register
export const verifyOtp = ({ onNext, phone, hash, otp }) => async (dispatch) => {
	try {
		dispatch( actions.createRequest() )

		const { data: { data } } = await axios.post('/api/auth/verify-otp', { phone, hash, otp })
		dispatch( actions.setAuth({ user: data.user }) )
		// onNext() // no need it because redirect via home page isAuth changes

	} catch (error) {
		dispatch( actions.setError({ error: error.response.data.message }) )
	}
}

export const addFullName = (name) => (dispatch) => {
	dispatch(actions.setFullName(name))
}

// /src/steps/stepName.js : => /authenticate
export const activeUser = ({ navigate, setAvatar, avatar }) => async (dispatch, getState) => {
	try {
		dispatch( actions.createRequest() )

		const { name } = getState().auth.user

		const { data: { data } } = await axios.patch('/api/auth/active-user', { name, avatar })
		dispatch( actions.setActive({ user: data.user }) )

		// setAvatar('')
		// navigate('/rooms')
		// onNext() // send to nex step

	} catch (error) {
		dispatch( actions.setError({ error: error.response.data.message }) )
	}
}


// /App.js : => useEffect()
export const loadDataOnPageRefresh = () => async (dispatch) => {
	try {
		dispatch( actions.createRequest() )

		// because our axios used with interceptors: which auto-fire on every request, specially on 401 status code
		const { data: { data } } = await originalAxios.get(`${API_ORIGIN}/api/auth/refresh-token`, {
			withCredentials: true,  // required to get cookie from server as header
		})
		dispatch( actions.setAuth({ user: data.user }) )

	} catch (error) {
		dispatch( actions.setError({ error: error.response.data.message }) )
	}
}

// /pages/rooms.js : => logoutHandler
export const logout = () => async (dispatch) => {
	try {
		dispatch( actions.createRequest() )

		const { data: { status } } = await axios.get(`/api/auth/logout` )
		if(status !== 'success') throw new Error('logout failed')
		dispatch( actions.setLogout() )

	} catch (error) {
		dispatch( actions.setError({ error: error.response.data.message }) )
	}
}
