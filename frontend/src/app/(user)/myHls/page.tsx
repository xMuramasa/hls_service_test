"use client"

import React, { Suspense } from 'react';
import { useRouter } from "next/navigation";

import Image from 'next/image';

import { Grid, Paper } from '@mui/material';

import { MyPageProps } from '@/app/lib/definitions';
import VideoScroll from '@/app/ui/VideoScroll';

const MyPage: React.FC<MyPageProps> = () => {

	const [logged, setLogged]: any = React.useState(null);

	const router = useRouter();

	React.useEffect(() => {
		const cookies = document.cookie;
		const token = cookies.split(';').find(cookie => cookie.includes('token'))?.split('=');
		console.log('token', token)
		if (token && token[1] !== "") {
			setLogged(true)
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
							<Suspense fallback={<></>}>
								<VideoScroll />
							</Suspense>
						</Paper>
					</Grid>
				</Grid>
			}
		</>
	);
}



export default MyPage;