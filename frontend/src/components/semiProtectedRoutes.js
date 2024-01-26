import { Outlet, Navigate } from 'react-router-dom'

const SemiProtectedRoutes = () => {
	const isActive = true

	return isActive ? <Outlet /> : Navigate({ to: '/register'  })
}
export default SemiProtectedRoutes