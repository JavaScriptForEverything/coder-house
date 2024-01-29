import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import withNavigation from '../components/shared/withNavigation'
import StepName from '../steps/stepName'
import StepAvatar from '../steps/stepAvatar'

const steps = {
	1: StepName,
	2: StepAvatar,
}

const Authenticate = () => {
	const navigate = useNavigate()
	const [ step, setStep ] = useState(1)

	const Step = steps[step]

	useEffect(() => {
		document.title = 'Authenticate Page'
	}, [])

	const nextHandler = () => {
		if(step >= 2) return navigate('/rooms')
		setStep( prevStep => prevStep + 1)
	}

	return <Step onNext={nextHandler} />
}
export default withNavigation(Authenticate)
