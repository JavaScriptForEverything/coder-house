
const Button = (props) => {
	const {
		children,
		className,
		onClick,
		type='button',
	} = props

	return (
		<>
		{/* <div name='content-container' className='flex-1'>
			<h1 name='title' className='text-slate-800 font-medium text-center my-2'> Welcome to CoderHouse </h1>
			<p className='text-slate-500 cutoff-text text-center text-sm'>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni facilis mollitia ea incidunt? Tenetur quam aliquid ratione quos architecto modi! Optio aliquam deleniti adipisci saepe delectus ab nemo eos modi.
			</p>
		</div> */}

			<button type={type} onClick={onClick} className={`
				${className}
				bg-blue-500 text-slate-50 px-3 py-0.5 rounded-2xl flex gap-0.5 items-center
				`}
			>
				{children}
			</button>
		</>
	)
}
export default Button
