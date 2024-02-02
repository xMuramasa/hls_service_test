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

import Image from 'next/image';
import Link from 'next/link';

import HlsVideo from '../../../public/HlsVideo.svg';


function ResponsiveAppBar() {

  return (
	  <AppBar position="static" sx={{ 
		background: "linear-gradient(90deg, #EF5D70 58%, #EFD677 100%)"
	  }}>
		<Container maxWidth="xl">
		  <Toolbar disableGutters>
			<Grid container justifyContent={"space-between"} alignItems={"center"}>
                <Link href="/">
                    <Grid item xs container alignItems={"center"}>
                        <Image
                            priority
                            src={HlsVideo}
                            width={180}
                            alt="Home"
                        />
                    </Grid>
                </Link>
			</Grid>
		  </Toolbar>
		</Container>
	  </AppBar>
  );
}
export default ResponsiveAppBar;