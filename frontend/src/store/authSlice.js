import { createSlice } from '@reduxjs/toolkit';
import { axios } from '../http';

const initialState = {
	loading: false,
	error: '',
	isAuth: false,
	isActive: false,
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
		setActive: (state, action) => ({				// => dispatch( actions.setOtp({ isActive, user }))
			...state,
			loading: false,
			error: '',

			isActive: action.payload.user.isActive,
			user: {
				...state.user,
				...action.payload.user, 						// => return updated users too
			}
		})

	}
})
export default reducer

// /src/steps/stepPhoneEmail.js : => /register
export const getOtp = ({ onNext, phone }) => async (dispatch) => {
	try {
		dispatch( actions.createRequest() )

		const { data: res, error } = await axios({
			url: '/api/auth/send-otp',
			method: 'POST',
			data: { phone }
		})

		if(error) return dispatch( actions.setError({ error: error.message }) )
		dispatch( actions.setOtp({ 
			phone: res.data.phone, 
			hash: res.data.hash 
		}) )

		onNext()
		console.log({ message: res.data.message })

	} catch (error) {
		dispatch( actions.setError({ error: error.message }) )
	}
}

// /src/steps/stepOTP.js : => /register
export const verifyOtp = ({ onNext, phone, hash, otp }) => async (dispatch) => {
	try {
		dispatch( actions.createRequest() )

		const { data, error } = await axios({
			url: '/api/auth/verify-otp',
			method: 'POST',
			data: { 
				phone,
				hash,
				otp,
			}
		})

		if(error) return dispatch( actions.setError({ error }) )

		const { user } = data.data
		dispatch( actions.setAuth({ user }) )

		// onNext() // send to nex step

	} catch (error) {
		dispatch( actions.setError({ error: error.message }) )
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

		const { data, error } = await axios({
			url: '/api/auth/active-user',
			method: 'PATCH',
			data: { name, avatar }
		})

		if(error) return dispatch( actions.setError({ error }) )

		const { user } = data.data
		dispatch( actions.setActive({ user }) )

		setAvatar('')
		navigate('/rooms')
		// onNext() // send to nex step

	} catch (error) {
		dispatch( actions.setError({ error: error.message }) )
	}
}

