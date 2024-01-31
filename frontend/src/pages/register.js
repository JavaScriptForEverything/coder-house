import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import withNavigation from '../components/shared/withNavigation'
import StepPhoneEmail from '../steps/stepPhoneEmail'
import StepOTP from '../steps/stepOTP'

const steps = {
	1: StepPhoneEmail,
	2: StepOTP,
}

const Register = () => {
	const navigate = useNavigate()
	const [ step, setStep ] = useState(1)

	const Step = steps[step]


	const nextHandler = () => {
		if(step >= 2) return navigate('/authenticate')
		setStep( prevStep => prevStep + 1)
	}

	return <Step onNext={nextHandler} />
	
}
export default withNavigation(Register)
