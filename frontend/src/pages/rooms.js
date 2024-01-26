import { useEffect, useRef } from 'react'


const Rooms = () => {
	const videoRef = useRef()

	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true }).then( stream => {
			videoRef.current.srcObject = stream 
		})
	}, [])

	return (
		<>
			<p>Rooms page</p>
			<video ref={videoRef} autoPlay></video>
		</>
	)
}
export default Rooms

