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

