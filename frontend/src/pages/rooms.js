import { useLayoutEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Rooms = () => {
	const navigate = useNavigate()
	const { isActive } = useSelector(state => state.auth)
	
	const videoRef = useRef()

	useLayoutEffect(() => {
		document.title = 'Rooms | '
	}, [])

	useLayoutEffect(() => {
		if(!isActive) navigate('/')
	}, [isActive, navigate])


	// useEffect(() => {
	// 	navigator.mediaDevices.getUserMedia({ video: true }).then( stream => {
	// 		videoRef.current.srcObject = stream 
	// 	})
	// }, [])

	return (
		<>
			<p>Rooms page</p>
			<video ref={videoRef} autoPlay></video>
		</>
	)
}
export default Rooms

