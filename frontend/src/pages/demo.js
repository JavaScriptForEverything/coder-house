import { useEffect, useState } from 'react'

const Demo = () => {
	const [ name, setName ] = useState('')

	return (
		<>
			<p>your name: {name}</p>
			<input type="text" onChange={(evt) => setName(evt.target.value)} />

			<UpdateName setName={setName} />
		</>
	)
}
export default Demo

const UpdateName = ({ setName }) => {

	useEffect(() => {
		setName('riaz') // This will cause the error
	}, [setName])
	
	return null
}