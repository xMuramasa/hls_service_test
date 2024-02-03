"use client"

import React from 'react';
import { useRouter } from "next/navigation";

import { Grid, IconButton } from '@mui/material';

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

import { VideoCard } from '@/app/lib/definitions';
import { isEmptyOrUndefined } from '@/app/lib/utils';
import VideoCardComponent from '@/app/ui/VideoCard';


function VideoScroll ({ videos }: { videos: VideoCard[] }) {

	const router = useRouter();

	function handleScroll(value: number = 1000) {
		const element = document.getElementById("video-scroll");
		if (element) {
			element.scrollBy({
				left: element.offsetLeft + value,
				behavior: "smooth",
			});
		}
	}

	function handleSelectVideo(name: string) {
		router.push(`/player/${name}`);
	}

	return (
		<Grid container direction={"row"} justifyContent={"space-evenly"} alignItems={"center"}>

			<Grid item >
				<IconButton onClick={() => {handleScroll(-1000)}}>
					<ArrowBackIosNewRoundedIcon sx={{ fontSize: '90px', color: '#fff' }}/>
				</IconButton>
			</Grid>

			<Grid id={"video-scroll"} container direction={"column"} sx={{ width: "70vw", height: "40vh", overflowY:'auto'}}>
				{videos && !isEmptyOrUndefined(videos, 'array') 
					&& videos.map((video: any) => (
					<VideoCardComponent key={video.Id} card={video} handleSelectVideo={handleSelectVideo} />
				))}
			</Grid>
			<Grid item >
				<IconButton onClick={() => {handleScroll()}}>
					<ArrowForwardIosRoundedIcon sx={{ fontSize: '90px', color: '#fff' }}/>
				</IconButton>
			</Grid>
		</Grid>
	);
}

export default VideoScroll;

