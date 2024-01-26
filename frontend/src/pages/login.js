import { Link } from 'react-router-dom'
import withNavigation from '../components/shared/withNavigation'

const Login = () => {

	return (
		<>
			<Link to='/' >Home</Link>
			<Link to='/register' >Register</Link>
			
		<div>Login Page</div>
		</>
	)
}
export default withNavigation(Login)
