import originalAxios from 'axios'

export const API_ORIGIN = process.env.REACT_APP_API_ORIGIN

export const axios = originalAxios.create({
	baseURL: API_ORIGIN,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	},
	withCredentials: true
})



axios.interceptors.response.use((config) => config, async (error) => {
	const originalRequest = error.config
	const responseStatus = error.response.status 	// => 401

	/* 	originalRequest.isRetired  custom property we set 
				. to check is request once failed duto accesstoken expires
				. so our job to send a request to update accessToken based on refreshToken
				. then set the originalRequest back whitout user realize that accessToken just refreshed
	*/ 
	
	if(originalRequest && responseStatus === 401 && !originalRequest.isRetired) {
		originalRequest.isRetired = true 	// if already tried once then above condition will be faule

		try {
			// Send request to refresh accessToken via refreshToken
			await originalAxios.get(`${API_ORIGIN}/api/auth/refresh-token`, {
				withCredentials: true,  // required to get cookie from server as header
			})
		} catch (error) {
			console.log(error.message)
		}
		
		// finally re-send the failed request after refresh accessToken
		return axios.request( originalRequest )
	}

	throw error
})


