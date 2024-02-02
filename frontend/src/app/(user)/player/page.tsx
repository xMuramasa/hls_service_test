"use client";

import * as React from 'react';
import { useRouter } from "next/navigation";

import {
	Button,
	Grid,
	Paper,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import Hls from "hls.js";

import { isEmptyOrUndefined } from "../../lib/utils";
import Link from 'next/link';

interface PlayerProps {
	apiUrl: string,
	HlsSupported: boolean,
	loginJWT: string,
	activeVideo: string,
}

const  Player: React.FC<PlayerProps>= (props) => {

	const [logged, setLogged]: any = React.useState(null);

	const router = useRouter();

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

	const {
		apiUrl = 'http://localhost:8080',
		activeVideo = 'big_bunny',
	} = props;
	

	React.useEffect(() => {
		if (HlsSupported && !isEmptyOrUndefined(activeVideo, 'string') ) {
			var video: any = document.getElementById('video');

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
			
			hls.loadSource(`${apiUrl}/videos/${activeVideo}/segment.m3u8`);
			// bind them together
			hls.attachMedia(video)
		} else {
			console.log('HLS is not supported or video is not selected');
		}
	}, [activeVideo]);

	return (
		<>
		{ logged === null ? <></>
		: !logged ? 
			router.push("/")
		:
			<Paper sx={{ backgroundColor: "#1E1E1E", height:'100vh', m:0, borderRadius: 0 }}>
				<Button sx={{ backgroundColor: '#313131', height: '6vh', position:'absolute', m: 2, pl: 2, pt:1 }}>
					<Link href="/myHls">
						<Grid container justifyContent={"center"} alignItems={"center"}>
							<Grid item xs>
								<ArrowBackIosIcon fontSize='large' sx={{ color: '#ffff' }} />
							</Grid>
						</Grid>
					</Link>
					</Button>
				<video id="video" controls height={"90%"} width={"100%"} />
			</Paper>
		}
		</>
	);
}

export default Player;