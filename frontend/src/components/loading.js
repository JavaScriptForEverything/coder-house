import withNavigation from './shared/withNavigation'

const Loading = () => {

	return (
		<div className='h-full flex justify-center items-center text-blue-500 '>
			<svg className='w-12 h-12' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M2,12A11.2,11.2,0,0,1,13,1.05C12.67,1,12.34,1,12,1a11,11,0,0,0,0,22c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z"><animateTransform attributeName="transform" dur="0.8s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>	
		</div>
	)
}
export default withNavigation(Loading)
