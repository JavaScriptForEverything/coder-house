import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {
	const { isAuth, user } = useSelector( state => state.auth )

	return isAuth && user.isActive ? <Outlet /> : Navigate({ to: '/'  })
}
export default ProtectedRoutes