"use client"

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface UserCard {
    Id: number;
    Email: string;
    Name: string;
}

const UserCardComponent: React.FC<{card: UserCard}> = ({ card }) => {
    return (
        <Card sx={{ minWidth: 120, maxHeight: 300 }}>
            <CardActionArea>
                <CardMedia
                component="img"
                image="https://picsum.photos/210/100"
                alt="green iguana"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {card.Name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {card.Email}                    
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default UserCardComponent;