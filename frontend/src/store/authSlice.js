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
		isAuth: false,
		isActive: false,
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

			isAuth: action.payload.isAuth,
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

			isActive: action.payload.isActive,
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
			url: '/api/send-otp',
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
			url: '/api/verify-otp',
			method: 'POST',
			data: { 
				phone,
				hash,
				otp,
			}
		})

		if(error) return dispatch( actions.setError({ error }) )

		const { isAuth, user } = data.data
		dispatch( actions.setAuth({ isAuth, user }) )

		onNext() // send to nex step

	} catch (error) {
		dispatch( actions.setError({ error: error.message }) )
	}
}

export const addFullName = (name) => (dispatch) => {
	dispatch(actions.setFullName(name))
}

// /src/steps/stepName.js : => /authenticate
export const activeUser = ({ onNext, avatar }) => async (dispatch, getState) => {
	try {
		dispatch( actions.createRequest() )

		const { _id, name } = getState().auth.user

		const { data, error } = await axios({
			url: '/api/active-user',
			method: 'PATCH',
			data: { 
				avatar, 
				userId: _id,
				name
			}
		})

		if(error) return dispatch( actions.setError({ error }) )

		const { isActive, user } = data.data
		dispatch( actions.setAuth({ isActive, user }) )

		onNext() // send to nex step

	} catch (error) {
		dispatch( actions.setError({ error: error.message }) )
	}
}

