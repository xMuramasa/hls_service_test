"use client"

import React from 'react';
import axios from 'axios';

import BigBunny from '../../../public/big-buck-bunny.png';
import Hero from '../../../public/hero.jpg';


import VideoCard from './VideoCard';

import { Grid, IconButton } from '@mui/material';
import { isEmptyOrUndefined } from '../lib/utils';

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';


const fetchVideos = async (loginJWT: string, apiUrl: string) => {
	let videos = [...VideoList]
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

async function VideoScroll () {
	
	const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
	const loginJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQHRlc3QuY29tIiwiZXhwIjoxNzA2OTA4ODMwLCJpZCI6MX0.bYRMl-Xe_RfY1hxy68QbiEqpwiuZobYoVr7aUdT0F-I';
	
	const videos = await fetchVideos(loginJWT, apiUrl);


	function handleScroll(value: number = 1000) {
		const element = document.getElementById("video-scroll");
		if (element) {
			element.scrollBy({
				left: element.offsetLeft + value,
				behavior: "smooth",
			});
		}
	}

	return (
		<Grid container direction={"row"} justifyContent={"space-evenly"} alignItems={"center"}>

			<Grid item >
				<IconButton onClick={() => {handleScroll(-1000)}}>
					<ArrowBackIosNewRoundedIcon sx={{ fontSize: '90px', color: '#fff' }}/>
				</IconButton>
			</Grid>

			<Grid id={"video-scroll"} container direction={"column"} sx={{ width: "70vw", height: "40vh", overflowY:'auto'}}>
					{videos && !isEmptyOrUndefined(videos, 'array') && videos.map((video: any) => (
						<VideoCard key={video.Id} card={video} />
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




const VideoList = [
	{
		"Id": 1,
		"Name": "Big Bunny",
		"Description": "Demo Video for HLS Streaming",
		"Thumbnail": BigBunny,
		"Video": "big_bunny.mp4"
	},
	{
		"Id": 2,
		"Name": "Lorem Ipsum",
		"Description": "Lorem Ipsum",
		"Thumbnail": Hero,
		"Video": ""
	},
	{
		"Id": 3,
		"Name": "Dolor Sit",
		"Description": "Dolor Sit",
		"Thumbnail": Hero,
		"Video": ""
	},
	{
		"Id": 4,
		"Name": "Amet Consectetur",
		"Description": "Amet Consectetur",
		"Thumbnail": Hero,
		"Video": ""
	},
	{
		"Id": 5,
		"Name": "Adipiscing Elit",
		"Description": "Adipiscing Elit",
		"Thumbnail": Hero,
		"Video": ""
	},
	{
		"Id": 6,
		"Name": "Sed Do Eiusmod",
		"Description": "Sed Do Eiusmod",
		"Thumbnail": Hero,
		"Video": ""
	},
	{
		"Id": 7,
		"Name": "Tempor Incididunt",
		"Description": "Tempor Incididunt",
		"Thumbnail": Hero,
		"Video": ""
	},
	{
		"Id": 8,
		"Name": "Labore Et Dolore",
		"Description": "Labore Et Dolore",
		"Thumbnail": Hero,
		"Video": ""
	},
	{
		"Id": 9,
		"Name": "Magna Aliqua",
		"Description": "Magna Aliqua",
		"Thumbnail": Hero,
		"Video": ""
	},
	{
		"Id": 10,
		"Name": "Ut Enim Ad Minim",
		"Description": "Ut Enim Ad Minim",
		"Thumbnail": Hero,
		"Video": ""
	},
	{
		"Id": 11,
		"Name": "Veniam Quis Nostrud",
		"Description": "Veniam Quis Nostrud",
		"Thumbnail": Hero,
		"Video": ""
	},
	{
		"Id": 12,
		"Name": "Exercitation Ullamco",
		"Description": "Exercitation Ullamco",
		"Thumbnail": Hero,
		"Video": ""
	},


]
