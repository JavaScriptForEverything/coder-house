import { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as authSlice from '../store/authSlice'


const Rooms = () => {
	const dispatch = useDispatch()
	const { user } = useSelector(state => state.auth)
	
	// const videoRef = useRef()

	useLayoutEffect(() => {
		document.title = 'Rooms | '
	}, [])

	// useEffect(() => {
	// 	if(!user.isActive) navigate('/')
	// }, [user.isActive, navigate])



	const logoutHandler = () => {
		dispatch(authSlice.logout())
	}

	return (
		<>
			<p>Rooms page</p>
			<p>
				<button onClick={logoutHandler} className='px-2 py-1.5 border border-red-500'>Logout</button>
			</p>

			<pre>
				{JSON.stringify(user, null, 2)}
			</pre>


			{/* <video ref={videoRef} autoPlay></video> */}
		</>
	)
}
export default Rooms

