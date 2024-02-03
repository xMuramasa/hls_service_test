"use client"

import * as React from 'react';

import { 
	CardActionArea,
	Card,
	CardContent,
	Typography,

} from '@mui/material';

import Image from 'next/image';

import { VideoCard, changeState } from '@/app/lib/definitions';

const VideoCardComponent = (
	{card, handleSelectVideo}: {card: VideoCard, handleSelectVideo: changeState}
) => {
	return (
		<Card sx={{ width: "16vw", height: '34vh', backgroundColor: "rgb(0,0,0,0)", m: 4 }}>
			<CardActionArea onClick={()=> {handleSelectVideo(card.Video)}}>
				<Image
					priority
					src={card.Thumbnail}
					height={180}
					width={320}
					alt={card.Video}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div" sx={{ color: "#fff" }}>
						{card.Name}
					</Typography>
					<Typography variant="body1" color="text.secondary" sx={{ color: "#fff" }}>
						{card.Description}                    
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

export default VideoCardComponent;