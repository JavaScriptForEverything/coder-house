import withNavigation from '../components/shared/withNavigation'
import { useState } from 'react'

const Login = () => {
	const [ count, setCount ] = useState(1)


	const clickHandler = () => {
		setCount( count + 1 )
	}
	const clickHandlerAsync = () => {
		setTimeout(() => {
			setCount( count + 1 )
			// setCount( prev => prev + 1 )
		}, 2000)
	}



	return (
		<>
			<button onClick={clickHandler}>incress</button>
			<button onClick={clickHandlerAsync}>incressAsync</button>
			<div>Login Page: {count} </div>

		</>
	)
}
export default withNavigation(Login)
