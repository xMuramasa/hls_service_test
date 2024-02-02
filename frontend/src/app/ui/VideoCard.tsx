"use client"

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Link from 'next/link';

import Image from 'next/image';

interface VideoCard {
	Name: string,
	Description: string,
	Thumbnail: string | any,
	Video: string,
}

const VideoCardComponent: React.FC<{card: VideoCard}> = ({ card }) => {
	return (
		<Card sx={{ width: "16vw", height: '34vh', backgroundColor: "rgb(0,0,0,0)", m: 4 }}>
			<Link href={card.Video !== '' ? `/player` : "/myHls"}>
				<CardActionArea>
						{  typeof card.Thumbnail === 'string' ?
							<CardMedia
								component="img"
								image={card.Thumbnail}
								width={210}
								height={180}
								alt={card.Video}
							/>
							: 
							<Image
								priority
								src={card.Thumbnail}
								height={180}
								alt={card.Video}
							/>
						}
						<CardContent>
							<Typography gutterBottom variant="h5" component="div" sx={{ color: "#fff" }}>
								{card.Name}
							</Typography>
							<Typography variant="body1" color="text.secondary" sx={{ color: "#fff" }}>
								{card.Description}                    
							</Typography>
						</CardContent>
					</CardActionArea>
				</Link>
		</Card>
	)
}

export default VideoCardComponent;