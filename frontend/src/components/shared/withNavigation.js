import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { API_ORIGIN } from '../../http'
import * as authSlice from '../../store/authSlice'

const withNavigation = (Component) => {
	const WithNavigation = () => {
		const dispatch = useDispatch()
		const { user } = useSelector(state => state.auth)

		const logoutHandler = () => {
			dispatch(authSlice.logout())
		}

		return (
				<div className='container mx-auto bg-slate-100 h-screen flex flex-col'>
					<div className='
						flex items-center justify-between border-b border-slate-300
						py-2
					'>
						<div className='flex items-center gap-2 '>
							<Link to='/' className='text-slate-700'>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 9v6h-8v4.84L4.16 12L12 4.16V9z"/></svg>
							</Link>

							<Link to='/' className='text-slate-700'>Coder House</Link>

						</div>

						<div className='flex items-center gap-2 '>
							{ user.name && <p>{user.name}</p> }
							{ user.avatar && <img src={API_ORIGIN + user.avatar} alt='logo' className='w-8 h-8 rounded-full' /> }
							{ user.avatar && <Link onClick={logoutHandler} to='/' className='text-blue-500 '>Logout</Link> }
						</div>


					</div>

					<Component />
				</div>
			)
	}

	return WithNavigation
}
export default withNavigation
