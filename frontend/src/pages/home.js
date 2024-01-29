import { Link, useNavigate } from 'react-router-dom'
import withNavigation from '../components/shared/withNavigation'
import { useEffect } from 'react'


const Home = () => {
	const navigate = useNavigate()

	useEffect(() => {
		document.title = 'Home Page'
	}, [])

	useEffect(() => {
		// navigate('/login')
	}, [navigate])

	return (
		<div className='flex-1 bg-slate-500/20 flex justify-center items-center'>
			<div className='p-2 w-72 h-72 flex flex-col items-center bg-slate-100 rounded-md border border-slate-300 text-slate-700 '>

				<div name='content-container' className='flex-1'>
					<h1 name='title' className='text-slate-800 font-medium text-center my-2'> Welcome to CoderHouse </h1>
					<p className='text-slate-500 cutoff-text text-center text-sm'>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni facilis mollitia ea incidunt? Tenetur quam aliquid ratione quos architecto modi! Optio aliquam deleniti adipisci saepe delectus ab nemo eos modi.
					</p>
				</div>

				<div name='button-container' className='flex flex-col gap-1 items-center'>
					<Link to='/register'>
						<button className='bg-blue-500 text-slate-50 px-3 py-1.5 rounded-2xl flex gap-2 items-center'>
							<span> Get your username </span>
							<span>
								<svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14 16.94v-4H5.08l-.03-2.01H14V6.94l5 5Z"/></svg>
							</span>
						</button>
					</Link>

					<div>
						<Link to='/login'>
							<span className='text-blue-500 text-sm underline decoration-dotted'>login text</span>
						</Link>
					</div>
				</div>

			</div>
		</div>
	)
}
export default withNavigation(Home)
