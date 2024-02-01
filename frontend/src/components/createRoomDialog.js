const CreateRoomDialog = (props) => {

	const { 
		dialog, 
		onChange = f=>f,
		onSubmit = f=>f,
		onTypeClick = f=>f,
	} = props

	const closeHandler = () => {
		dialog.current.close()
	}

	return (
		<dialog ref={dialog} className='p-3 rounded-md border border-slate-300 text-slate-900'>
			<div className='flex justify-end'>
				<button onClick={closeHandler} className='
					px-2 rounded-full hover:bg-slate-200
				'>x</button>
			</div>

			<div name='search-container' className='mb-2 flex flex-col gap-1'>
				<p>Enter the topic to discus</p>
				<input onChange={onChange} type="text" className='
					w-full px-3 py-1 rounded-md border border-slate-300 text-slate-700
					focus:outline-none focus:border-blue-500

				' />
			</div>

			<div name='room-type-container' className='flex flex-col gap-1'>
				<p>Room Type</p>

				<div name='types-container' className='grid grid-cols-3 gap-2'>
					<div onClick={onTypeClick('open')} name='open' className='
					cursor-pointer hover:bg-slate-400/35 [&.active]:bg-slate-400/50
					p-4 border border-slate-300/80 bg-slate-400/25'>
						<span className='pointer-events-none'>open</span>
					</div>

					<div onClick={onTypeClick('social')} name='social' className='
					cursor-pointer hover:bg-slate-400/35 [&.active]:bg-slate-400/50
					p-4 border border-slate-300/80 bg-slate-400/25'>
						<span className='pointer-events-none'>social</span>
					</div>

					<div onClick={onTypeClick('closed')} name='closed' className='
					cursor-pointer hover:bg-slate-400/35 [&.active]:bg-slate-400/50
					p-4 border border-slate-300/80 bg-slate-400/25'>
						<span className='pointer-events-none'>closed</span>
					</div>

				</div>

			</div>

			<div name='button-container' className='my-4 flex flex-col gap-1'>
				<p>Start a room, open to everyone</p>
				<button onClick={onSubmit} className='
					px-3 py-1.5 rounded-md border border-blue-500 bg-blue-500 text-slate-50
					self-center
				'>Let's Go</button>
			</div>
		</dialog>
	)
}
export default CreateRoomDialog
