import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {
	const isProtected = false

	return isProtected ? <Outlet /> : Navigate({ to: '/'  })
}
export default ProtectedRoutes