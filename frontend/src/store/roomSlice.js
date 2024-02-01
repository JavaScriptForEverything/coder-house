import { createSlice } from '@reduxjs/toolkit';
import { axios } from '../http';


const initialState = {
	loading: false,
	error: '',
	room: {
		_id: '',
		topic: '',
		roomType: '',
		owner: '',
		speakers: [],
		createdAt: '',
	},
	rooms: []
}

const { reducer, actions } = createSlice({
	name: 'room',
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
		// setRoom: (state, action) => ({				// => dispatch( actions.setRoom( room ))
		// 	...state,
		// 	loading: false,
		// 	error: '',

		// 	room: {
		// 		...state.room,
		// 		...action.payload
		// 	},
		// 	// rooms: [...state.rooms, action.payload]
		// }),
		setRoom: (state, action) => {
			state.room = { ...state.room, ...action.payload }
			// state.rooms = [ ...state.rooms, ...action.payload ]
		},

		setRooms: (state, action) => ({				// => dispatch( actions.setRooms( rooms ))
			...state,
			loading: false,
			error: '',

			rooms: action.payload
		}),

	}
})
export default reducer

// /src/pages/rooms.js : => dialogSubmitHandler
export const createRoom = (payload) => async (dispatch) => {
	try {
		const { data: { data } } = await axios.post('/api/rooms', payload)

		dispatch( actions.setRoom(data.room))
		console.log({ data })

	} catch (error) {
		dispatch( actions.setError({ error: error.response.data.message }) )
	}
}

export const getAllRooms = () => async (dispatch) => {
	try {
		const { data: { data } } = await axios.get('/api/rooms')

		dispatch( actions.setRooms(data.rooms))
		console.log({ data })

	} catch (error) {
		dispatch( actions.setError({ error: error.response.data.message }) )
	}
}
