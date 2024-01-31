import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const SemiProtectedRoutes = () => {
	const navigate = useNavigate()
	const { isAuth, user } = useSelector(state => state.auth)

	useEffect(() => {
		if(isAuth && user.isActive) return navigate('/rooms')
		if(!isAuth) return navigate('/')
	}, [isAuth, user.isActive, navigate])

	return isAuth && !user.isActive && <Outlet /> 
}
export default SemiProtectedRoutes