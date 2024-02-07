"use client";

import * as React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from "next/navigation";

import {
	Box,
	Button,
	CircularProgress,
	Grid,
	IconButton,
	Paper,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import Hls from "hls.js";

import { isEmptyOrUndefined } from "@/app/lib/utils";
import { getVideoStream } from './GetVideo';

const  Player = () => {

	const [logged, setLogged]: any = React.useState(null);

	const [videoOk, setVideoOk] = React.useState(false);

	const router = useRouter();
	const params = useParams();

	React.useEffect(() => {
		const cookies = document.cookie;
		const token = cookies.split(';').find(cookie => cookie.includes('token'))?.split('=');
		if (token && token[1] !== "") {
			setLogged(token[1])
		} else {
			setLogged(false)
		}
	}, []);

	const HlsSupported = Hls.isSupported();

	const apiUrl = 'http://localhost:8080';

	React.useEffect(() => {
		if (HlsSupported 
			&& !isEmptyOrUndefined(params?.videoId, 'string')
			&& !isEmptyOrUndefined(logged, 'string')) {
			
			getVideoStream(apiUrl, params.videoId, logged).then(res => setVideoOk(res));
						
		}
	}, [params, logged]);

	React.useEffect(()=>{
		if (videoOk
			&& !isEmptyOrUndefined(params?.videoId, 'string')
			&& !isEmptyOrUndefined(logged, 'string')) {

			var video: any = document.getElementById('video');
			const hls = new Hls({
				autoStartLoad: true,
				liveDurationInfinity: true,
				maxBufferLength: 60,

				xhrSetup: function (xhr) {
					xhr.setRequestHeader('authorization', logged);
				}
			})
			
			hls.loadSource(`${apiUrl}/video/play/${params.videoId}/video_${params.videoId}.m3u8`);

			// bind them together
			hls.attachMedia(video)

			hls.on(Hls.Events.MEDIA_ATTACHED, () => {
				video.play();
			})
			}
	}, [videoOk])

	return (
		<>
		{ logged === null || !videoOk ? 
			<>
			<Paper sx={{ height:'100vh', m:0 }}>
				<Box sx={{ display: 'flex' }}>
					<CircularProgress />
				</Box>
			</Paper>
			</>
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