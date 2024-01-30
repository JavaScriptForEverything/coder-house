import { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import withNavigation from '../components/shared/withNavigation'
import StepName from '../steps/stepName'
import StepAvatar from '../steps/stepAvatar'
import { useSelector } from 'react-redux'

const steps = {
	1: StepName,
	2: StepAvatar,
}

const Authenticate = () => {
	const navigate = useNavigate()
	const { user } = useSelector(state => state.auth)
	const [ step, setStep ] = useState(1)

	const Step = steps[step]

	// useLayoutEffect(() => {
	// 	if( !user.isAuth ) return navigate('/')
	// 	if( user.isAuth && user.isActive ) return navigate('/rooms')

	// }, [user.isAuth, user.isActive, navigate])

	useEffect(() => {
		if(user.name) return setStep(2)
	}, [user.name])

	const nextHandler = () => {
		if(step >= 2) return navigate('/rooms')
		setStep( prevStep => prevStep + 1)
	}

	return <Step onNext={nextHandler} />
}
export default withNavigation(Authenticate)
