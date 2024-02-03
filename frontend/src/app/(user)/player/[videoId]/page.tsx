"use client";

import * as React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from "next/navigation";

import {
	Button,
	Grid,
	IconButton,
	Paper,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import Hls from "hls.js";

import { isEmptyOrUndefined } from "@/app/lib/utils";

const  Player = () => {

	const [logged, setLogged]: any = React.useState(null);

	const router = useRouter();
	const params = useParams();

	React.useEffect(() => {
		const cookies = document.cookie;
		const token = cookies.split(';').find(cookie => cookie.includes('token'))?.split('=');
		if (token && token[1] !== "") {
			setLogged(true)
		} else {
			setLogged(false)
		}
	}, []);

	const HlsSupported = Hls.isSupported();

	const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

	React.useEffect(() => {
		if (HlsSupported && !isEmptyOrUndefined(params?.videoId, 'string') ) {
			var video: any = document.getElementById('video');
			
			console.log('logged', logged)

			const hls = new Hls({
				fetchSetup: function (context, initParams) {
					// Always send cookies, even for cross-origin calls.
					initParams.credentials = 'include';
					initParams.headers ={
					Authorization: logged,
					}
					return new Request(context.url, initParams);
				},
			})
			// bind them together
			hls.attachMedia(video);
			
			hls.loadSource(`${apiUrl}/videos/${params.videoId}/segment.m3u8`);
			// bind them together
			hls.attachMedia(video)
		} else {
			console.log('HLS is not supported or video is not selected');
		}
	}, [params, logged]);

	return (
		<>
		{ logged === null ? <></>
		: !logged ? 
			router.push("/")
		:
			<Paper sx={{ backgroundColor: "#1E1E1E", height:'100vh', m:0, borderRadius: 0 }}>
				<Button sx={{ backgroundColor: '#313131', height: '6vh', position:'absolute', m: 2, pl: 2, pt:1 }}>
					<Grid container justifyContent={"center"} alignItems={"center"}>
						<Grid item xs>
							<IconButton onClick={() => router.back()}  >
								<ArrowBackIosIcon fontSize='large' sx={{ color: '#ffff' }} />
							</IconButton>
						</Grid>
					</Grid>
					</Button>
				<video id="video" controls height={"90%"} width={"100%"} />
			</Paper>
		}
		</>
	);
}

export default Player;