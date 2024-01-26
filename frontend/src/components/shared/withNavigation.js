import { Link } from 'react-router-dom'

const withNavigation = (Component) => {
	return () => {

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
							<p>Riajul</p>
							<img src='/logo.png' alt='logo' className='w-8 h-8' />
						</div>
					</div>

					<Component />
				</div>
			)
	}
}
export default withNavigation
