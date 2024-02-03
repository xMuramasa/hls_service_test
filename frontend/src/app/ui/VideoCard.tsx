"use client"

import * as React from 'react';

import { 
	CardActionArea,
	Card,
	CardContent,
	Typography,

} from '@mui/material';

import Link from 'next/link';
import Image from 'next/image';

import { VideoCard } from '@/app/lib/definitions';

const VideoCardComponent: React.FC<{card: VideoCard}> = ({ card }) => {
	return (
		<Card sx={{ width: "16vw", height: '34vh', backgroundColor: "rgb(0,0,0,0)", m: 4 }}>
			<Link href={card.Video !== '' ? `/player` : "/myHls"}>
				<CardActionArea>
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
			</Link>
		</Card>
	)
}

export default VideoCardComponent;