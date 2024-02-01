import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as roomSlice from '../store/roomSlice'
import withNavigation from '../components/shared/withNavigation'
import RoomCard from '../components/roomCard'
import CreateRoomDialog from '../components/createRoomDialog'

// const rooms = [
// 	{
// 		id: 1,
// 		topic: 'which framework best for frontend',
// 		totalPeople: 9,
// 		speakers: [
// 			{
// 				id: 1,
// 				name: 'user 1',
// 				avatar: '/logo.png'
// 			},
// 			{
// 				id: 2,
// 				name: 'user 2',
// 				avatar: '/logo.png'
// 			}
// 		]
// 	},

// 	{
// 		id: 2,
// 		topic: 'which framework best for backend',
// 		totalPeople: 3,
// 		speakers: [
// 			{
// 				id: 1,
// 				name: 'user 1',
// 				avatar: '/logo.png'
// 			},
// 			{
// 				id: 2,
// 				name: 'user 2',
// 				avatar: '/logo.png'
// 			}
// 		]
// 	},

// 	{
// 		id: 3,
// 		topic: 'which framework best for frontend',
// 		totalPeople: 4,
// 		speakers: [
// 			{
// 				id: 1,
// 				name: 'user 1',
// 				avatar: '/logo.png'
// 			},
// 			{
// 				id: 2,
// 				name: 'user 2',
// 				avatar: '/logo.png'
// 			}
// 		]
// 	},

// 	{
// 		id: 4,
// 		topic: 'which framework best for frontend',
// 		totalPeople: 9,
// 		speakers: [
// 			{
// 				id: 1,
// 				name: 'user 1',
// 				avatar: '/logo.png'
// 			},
// 			{
// 				id: 2,
// 				name: 'user 2',
// 				avatar: '/logo.png'
// 			}
// 		]
// 	},

// 	{
// 		id: 5,
// 		topic: 'which framework best for frontend',
// 		totalPeople: 9,
// 		speakers: [
// 			{
// 				id: 1,
// 				name: 'user 1',
// 				avatar: '/logo.png'
// 			},
// 			{
// 				id: 2,
// 				name: 'user 2',
// 				avatar: '/logo.png'
// 			}
// 		]
// 	},


// ]

const Rooms = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { rooms, room } = useSelector(state => state.room )

	const dialogRef = useRef()
	const [ roomType, setRoomType ] = useState('open')
	const [ topic, setTopic ] = useState('')
	const [ checked, setChecked ] = useState(false)
	

	useLayoutEffect(() => {
		document.title = 'Rooms | '
	}, [])

	useEffect(() => {
		if(room._id) navigate(`/room/${room._id}`)
	}, [room._id, navigate])

	useEffect(() => {
		dispatch(roomSlice.getAllRooms())
	}, [dispatch])

	const showRoomModal = () => dialogRef.current.showModal()
	const dialogInputChangeHandler = (evt) => setTopic(evt.target.value)
	const dialogTypeClickHandler = (name) => (evt) => {
		setRoomType(name)
		setChecked(!checked)
		evt.target.classList.toggle('active', checked)
	}
	

	
	const dialogSubmitHandler = (evt) => {
		evt.preventDefault()
		if(!topic.trim()) return console.log('topic is empty')

		const payload = { topic, roomType }
		dispatch(roomSlice.createRoom( payload ))
	}

	return (
		<div>

			<CreateRoomDialog 
				dialog={dialogRef} 
				onChange={dialogInputChangeHandler}
				onSubmit={dialogSubmitHandler}
				onTypeClick={dialogTypeClickHandler}
				checked={checked}
			/>


		<div name='header-container' className='flex gap-2' >
			<p>All Voice Rooms</p>
			<div>
				<input type='search' className='
					border border-slate-300 rounded 
				'/>
			</div>

			<button onClick={showRoomModal} className='
				px-2 py-1 border border-blue-500 rounded-xl bg-blue-100 text-blue-700
			'>Start Room</button>
		</div>

		<div name='rooms-container' className='p-2 grid grid-cols-2 gap-2'>
			{rooms.map( ({ _id, topic, speakers, totalPeople }) => (
				<RoomCard key={_id}
					topic={topic}
					speakers={speakers}
					totalPeople={totalPeople}
					to={`/room/${_id}`}
				/>
			))}


		</div>
		</div>
	)
}
export default withNavigation(Rooms)

