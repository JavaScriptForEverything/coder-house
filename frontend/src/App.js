import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Register from './pages/register'
import Authenticate from './pages/authenticate'
import Login from './pages/login'
import Rooms from './pages/rooms'
import ProtectedRoutes from './components/protectedRoutes'
import SemiProtectedRoutes from './components/semiProtectedRoutes'

const App = () => {

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
