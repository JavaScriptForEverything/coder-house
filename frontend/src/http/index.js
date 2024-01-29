
const API_ORIGIN = process.env.REACT_APP_API_ORIGIN

export const axios = async(option) => {
	let output = {
		data: {},
		error: null
	}

	const { 
		url, 
		method= 'GET', 
		isConvertToObject=true, 
		data 
	} = option

	const path = API_ORIGIN + url

	const body = isConvertToObject ? JSON.stringify(data) : data
	const headers = option.headers || {
		'content-type': 'application/json',
		'accept': 'application/json',
	}

	try {
		const res = await fetch(path, { 
			method: method.toUpperCase(), 
			body: body ? body: undefined, 
			headers,
			credentials: 'include',
		})

		const result = await res.json()

		// handle ServerSide: user throw error 							: return next( appError('...') )
		if(result.message) throw new Error(result.message) 		

		// handle ServerSide: unhandled error 							: return next( '...' ) or any error
		if( !res.ok ) throw new Error('Unknown Error') 				

		output.data = result

	} catch (err) {
		output.error = {
			message: err.message,
		}
	}

	return output
}





export const sendOtp = async (obj) => {
	const { data, error } = await axios({
		url: '/api/send-otp',
		method: 'POST',
		data: obj,
	})


	return { data, error }
}