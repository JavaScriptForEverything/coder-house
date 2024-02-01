import { useEffect, useState } from 'react'
import { redirect, useLocation, useMatch, useNavigate } from 'react-router-dom'

const Demo = () => {
	const navigate = useNavigate()
	const [ name, setName ] = useState('')

	const location = useLocation
	console.log(location)

	const clickHandler = () => {
		// navigate('/room/alsdjfa')	
		redirect('/room/alsdjfa')
	}

	return (
		<>
			<button onClick={() => navigate('/rooms')}>rooms</button>
			<br />
			<button onClick={clickHandler}>room</button>
			<br />

			<p>your name: {name}</p>
			<input type="text" onChange={(evt) => setName(evt.target.value)} />



		</>
	)
}
export default Demo
