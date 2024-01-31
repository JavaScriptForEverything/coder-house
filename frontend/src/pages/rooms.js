import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as authSlice from '../store/authSlice'
import withNavigation from '../components/shared/withNavigation'


const Rooms = () => {
	const dispatch = useDispatch()
	const { user } = useSelector(state => state.auth)
	

	useLayoutEffect(() => {
		document.title = 'Rooms | '
	}, [])


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
export default withNavigation(Rooms)

