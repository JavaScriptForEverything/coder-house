import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const SemiProtectedRoutes = () => {
	const { isAuth, isActive } = useSelector(state => state.auth)

	return isAuth && !isActive ? <Outlet /> : Navigate({ to: '/register'  })
}
export default SemiProtectedRoutes