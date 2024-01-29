import { Route, Routes, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProtectedRoutes from './components/protectedRoutes'
import SemiProtectedRoutes from './components/semiProtectedRoutes'

import Home from './pages/home'
import Register from './pages/register'
import Authenticate from './pages/authenticate'
import Login from './pages/login'
import Rooms from './pages/rooms'
import { useLayoutEffect } from 'react'

const App = () => {
	const navigate = useNavigate()
	const { isAuth, isActive } = useSelector(state => state.auth )

	useLayoutEffect(() => {
		if(isAuth && !isActive) return navigate('/authenticate')
		if(isAuth && isActive) return navigate('/rooms')
	}, [isAuth, isActive, navigate])


	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />


			<Route element={<ProtectedRoutes />}>
				<Route path='/rooms' element={<Rooms />} />
			</Route>

			<Route element={<SemiProtectedRoutes />}>
				<Route path='/authenticate' element={<Authenticate />} />
			</Route>

		</Routes>
	)
}
export default App
