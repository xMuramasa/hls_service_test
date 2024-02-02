"use client";

import * as React from 'react';

import {
  AppBar,
  Container,
  Toolbar,
  Grid,
  Avatar,
  Typography,
} from '@mui/material';

import AdbIcon from '@mui/icons-material/Adb';

import Image from 'next/image';
import Link from 'next/link';

import ProfilePic from '../../../public/profile.png';

import ButtonComponent from './ButtonComponent';

function ResponsiveAppBar() {

  const handleClick = () => {
		document.cookie = ``;
  }

  return (
	  <AppBar position="static" sx={{ 
		background: "linear-gradient(90deg, #EF5D70 58%, #EFD677 100%)"
	  }}>
		<Container maxWidth="xl">
		  <Toolbar disableGutters>
			<Grid container justifyContent={"space-between"} alignItems={"center"}>
				<Grid item xs container alignItems={"center"}>
					<Avatar sx={{ width: 56, height: 56 }}>
						<Image
							priority
							src={ProfilePic}
							width={90}
							alt="Home"
							/>
					</Avatar>
					<Typography variant="h6" component="div" sx={{ ml: 2, color: "#fff" }}>
						Usuario
					</Typography>
				</Grid>
				<Grid item>
					<Link href={'/login'}>
						<ButtonComponent text="Cerrar Sesion" onClick={handleClick} />
					</Link>
				</Grid>
			</Grid>
		  </Toolbar>
		</Container>
	  </AppBar>
  );
}
export default ResponsiveAppBar;