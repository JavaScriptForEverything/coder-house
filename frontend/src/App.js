import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as authSlice from './store/authSlice'
import ProtectedRoutes from './components/protectedRoutes'
import SemiProtectedRoutes from './components/semiProtectedRoutes'

import Home from './pages/home'
import Register from './pages/register'
import Authenticate from './pages/authenticate'
import Login from './pages/login'
import Rooms from './pages/rooms'
import Loading from './components/loading'
import Demo from './pages/demo'

const App = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { loading, isAuth, user } = useSelector(state => state.auth )


	useEffect(() => {
		if(isAuth && user.isActive) return navigate('/rooms')
	}, [isAuth, user.isActive, navigate])


	useEffect(() => {
		dispatch(authSlice.loadDataOnPageRefresh())
	}, [dispatch])

	return loading ? <Loading /> : (
		<Routes>

			<Route path='/demo' element={<Demo />} />
			<Route path='/' element={<Home />} />

			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />

			<Route element={<SemiProtectedRoutes />}>
				<Route path='/authenticate' element={<Authenticate />} />
			</Route>

			<Route element={<ProtectedRoutes />}>
				<Route path='/rooms' element={<Rooms />} />
			</Route>


		</Routes>
	)
}
export default App
