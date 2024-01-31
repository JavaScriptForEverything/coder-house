import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as authSlice from '../store/authSlice'

import { RightArrowIcon } from '../icons'
import Button from '../components/button'
import Card from '../components/cart'

const StepName  = ({ onNext }) => {
	const dispatch = useDispatch()
	const { user } = useSelector( state => state.auth )
	const [ name, setName ] = useState(user.name)

	useLayoutEffect(() => {
		document.title = 'Authenticate Page | Full Name'
	}, [])


	// useEffect(() => {
	// 	if(user.name) onNext()
	// }, [user.name])

	const changeHandler = (evt) => {
		setName(evt.target.value)
	}
	const nextHandler = async () => {
		if( !name ) return console.log('show alert missing data')

		dispatch(authSlice.addFullName(name))
		onNext()
	}


	return (
		<>
		<Card className='border-0 border-red-500'>
			<div className='h-full flex flex-col gap-2 items-start'>
					<div className='flex gap-1 items-center'>
						<svg className='w-6 h-6 text-blue-500' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"/></svg>
						<p>Enter Your Full Name</p>
					</div>

					<input onChange={changeHandler} type="text" placeholder='Riajul Islam' className='
						px-3 py-1 rounded border border-blue-300 w-full
						focus:outline-none focus:border-blue-500 text-slate-800
					' />
					<Button onClick={nextHandler}> <span>Next</span> <RightArrowIcon /> </Button>
			</div>
		</Card>
		</>
	)

}
export default StepName  

