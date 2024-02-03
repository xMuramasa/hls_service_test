import axios from 'axios';

import { videoList } from "./placeholderVideos"
import { isEmptyOrUndefined } from '@/app/lib/utils';

export const fetchVideos = async (loginJWT: string | undefined, apiUrl: string) => {
	let videos = [...videoList]
	try {
		if (!isEmptyOrUndefined(loginJWT, 'string')) {
			const response = await axios.get(`${apiUrl}/videos`, {
				headers: {
					'Authorization': `${loginJWT}`,
				},
			})
			videos[0] = {
				...videos[0],
				"Video": response.data.videos[0].name
			}
		}
	} catch (error) {
		console.log("Error While fetching Data", error);
	}
	finally {
		return videos;
	}
}