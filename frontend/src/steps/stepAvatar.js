import { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { API_ORIGIN } from '../http'
import * as authSlice from '../store/authSlice'

import { RightArrowIcon } from '../icons'
import Button from '../components/button'
import Card from '../components/cart'
import logo from '../logo.png'

const StepAvatar    = ({ onNext }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { user } = useSelector( state => state.auth )
	const [ avatar, setAvatar ] = useState('')

	useLayoutEffect(() => {
		document.title = 'Authenticate Page | Avatar'
	}, [])


	const changeHandler = (evt) => {
		const [file] = evt.target.files
		if( !file.type.match('image/*') ) return

		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.addEventListener('loadend', () => {
			setAvatar(reader.result)
		})
	}
	const nextHandler = async () => {
		if(user.isActive) return navigate('/rooms')

		if( !avatar) return console.log('show alert missing data')

		dispatch(authSlice.activeUser({ 
			onNext,  			// to 
			avatar 
		}))
		setAvatar('')

	}


	return (
		<>
		<Card className='border-0 border-red-500'>
			<div className='h-full flex flex-col gap-2 items-center '>
					<div className='flex gap-1 items-center'>
						<svg className='w-6 h-6 text-blue-500' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"/></svg>
						<p>Okey, {user.name || 'Riajul Islam'}</p>
					</div>

					<input id='avatar' type="file" accept='image/*' onChange={changeHandler} hidden/>
					<label htmlFor="avatar" className='cursor-pointer'>

						{/* <img src={`${API_ORIGIN}/${avatar}` || logo} alt='avatar' className=' w-20 h-20 rounded-full border-2 border-blue-500 ' /> */}
						<img src={ avatar || `${API_ORIGIN}${user.avatar}` || logo} alt='avatar' className=' w-20 h-20 rounded-full border-2 border-blue-500 ' />

					</label>

					<Button onClick={nextHandler}> <span>Next</span> <RightArrowIcon /> </Button>
			</div>
		</Card>
		</>
	)

}
export default StepAvatar  


