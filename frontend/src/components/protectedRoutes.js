import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoutes = () => {
	const { isAuth, user } = useSelector( state => state.auth )
	const navigate = useNavigate()

	useEffect(() => {
		if(!user.isActive) return navigate('/')
	}, [user.isActive, navigate])

	return isAuth && user.isActive && <Outlet /> 
}
export default ProtectedRoutes