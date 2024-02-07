import axios from 'axios';

export const getVideoStream = async (apiUrl: string, videoId: string | string[], logged: string) => {
	try {
		const response =  await axios.get(`${apiUrl}/video/${videoId}`, {
			headers: {
				'Authorization': logged,
			},
		})
		return response.status === 200;
	} catch (error) {
		console.log("Error While fetching Data", error);
		return false;
	}
}