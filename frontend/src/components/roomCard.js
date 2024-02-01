import { Link } from 'react-router-dom'
import { API_ORIGIN } from '../http'

/*
	{rooms.map( ({ id, topic, speakers, totalPeople }) => (
		<RoomCard key={id}
			topic={topic}
			speakers={speakers}
			totalPeople={totalPeople}
		/>
	))}
*/
const RoomCard = (props) => {
	const {
		topic='',
		speakers=[],
		totalPeople=0,
		to=''
	} = props

	return (
		<div name='card-container' className='flex flex-col gap-4 
			bg-slate-200/25 p-2 border border-slate-300/80 text-slate-800
		'>
			<p name='title' className=' text-slate-900 capitalize w-40 truncate '>
				<Link to={to}>
					{topic}
				</Link>
			</p>

			<div name='content' className='
				flex gap-4
			'>
				<div name='images-container' className='relative'>

					<img src={API_ORIGIN + speakers[0].avatar} alt='avatar' className='w-8 h-8 rounded-full' />
					{speakers[1] && 
						<img src={API_ORIGIN + speakers[1].avatar} alt='avatar' className='w-8 h-8 rounded-full absolute -bottom-1 -right-3 ' />
					}
				</div>

				<div name='names-container' className='flex-1 '>
					<p>{speakers[0].name}</p>
					{speakers[1] && 
						<p>{speakers[1].name}</p>
					}
				</div>
			</div>

			<div name='actions' className='text-right flex justify-end gap-2' >
				<span>{totalPeople}</span>
				<span>persons</span>
			</div>
		</div>
	)
}
export default RoomCard
