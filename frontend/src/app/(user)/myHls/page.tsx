"use client"

import React, { Suspense } from 'react';
import { useRouter } from "next/navigation";

import Image from 'next/image';

import { Grid, Paper } from '@mui/material';

import VideoScroll from '@/app/ui/VideoScroll';

import { fetchVideos } from './LoadVideos';

const MyPage = () => {

	const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

	const [logged, setLogged]: any = React.useState(null);

	const router = useRouter();

	const [videos, setVideos]: any = React.useState([]);

	React.useEffect(() => {
		const cookies = document.cookie;
		const token = cookies.split(';').find(cookie => cookie.includes('token'))?.split('=');
		const jwt = token && token[1];
		if (token && token[1] !== "") {
			setLogged(true)
			fetchVideos(jwt, apiUrl).then(res => setVideos(res));
		} else {
			setLogged(false)
		}
	}, []);

	return (
		<>
			{
				logged === null ?
					<></>
				: !logged ? 
					router.push("/")
				:
				<Grid container direction={"column"} justifyContent={"center"} px={10} pt={2} >
					<Grid item xs={12} container justifyContent={"flex-end"}>
						<Image
							priority
							src={'/static/svgs/MyHls.svg'}
							width={320}
							height={180}
							alt="MyHls"
							/>
					</Grid>
					<Grid item xs={12} mt={6}>
						<Paper elevation={2} sx={{ backgroundColor: "#343333", borderRadius: 4 }}>
							{
								videos && videos.length > 0 &&
								<VideoScroll videos={videos} />
							}
						</Paper>
					</Grid>
				</Grid>
			}
		</>
	);
}



export default MyPage;