import { useParams } from 'react-router-dom'

const Room = () => {
	const params = useParams()
	console.log(params)

	return (
		<>
			<p>Room details page: {params.id}</p>	
		</>
	)
}
export default Room
