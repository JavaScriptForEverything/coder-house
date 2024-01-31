import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const SemiProtectedRoutes = () => {
	const { isAuth, user } = useSelector(state => state.auth)

	return isAuth && !user.isActive 
		? <Outlet /> 
		: isAuth && user.isActive 
			? Navigate({ to: '/rooms'  })
			: Navigate({ to: '/'  })
}
export default SemiProtectedRoutes