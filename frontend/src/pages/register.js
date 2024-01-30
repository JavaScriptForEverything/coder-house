import { useNavigate } from 'react-router-dom'
import { useLayoutEffect, useState } from 'react'

import withNavigation from '../components/shared/withNavigation'
import StepPhoneEmail from '../steps/stepPhoneEmail'
import StepOTP from '../steps/stepOTP'
import { useSelector } from 'react-redux'

const steps = {
	1: StepPhoneEmail,
	2: StepOTP,
}

const Register = () => {
	const navigate = useNavigate()
	const [ step, setStep ] = useState(1)
	const { user } = useSelector( state => state.auth )

	const Step = steps[step]

	useLayoutEffect(() => {
		if( user.avatar) navigate('/rooms')
	}, [user.avatar, navigate])

	const nextHandler = () => {
		if(step >= 2) return navigate('/authenticate')
		setStep( prevStep => prevStep + 1)
	}

	return <Step onNext={nextHandler} />
	
}
export default withNavigation(Register)
