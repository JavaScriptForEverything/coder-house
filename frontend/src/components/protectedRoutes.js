import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {
	const { isAuth, isActive } = useSelector( state => state.auth )
	console.log({ isAuth })

	return isAuth && isActive ? <Outlet /> : Navigate({ to: '/'  })
}
export default ProtectedRoutes