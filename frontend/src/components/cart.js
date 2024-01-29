
const Card = ({ children, className }) => {

	return (
		<div className='flex-1 bg-slate-500/20 flex justify-center items-center'>
			<div className=' p-2 w-72 h-72 flex flex-col items-center bg-slate-100 rounded-md border border-slate-300 text-slate-700 '>
				<div className={`flex-1 w-full ${className}`}> {children} </div>
			</div>
		</div>
	)
}
export default Card

