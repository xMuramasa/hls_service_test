"use client";

import * as React from 'react';

import {
  AppBar,
  Container,
  Toolbar,
  Grid,
} from '@mui/material';

import AdbIcon from '@mui/icons-material/Adb';
import NavLinks from './nav-links';

import Image from 'next/image';
import Link from 'next/link';

import { default as HlsVideo } from '../../../public/HlsVideo.svg';

import ButtonComponent from './ButtonComponent';

function ResponsiveAppBar() {

  const handleClick = () => {
  }

  return (
      <AppBar position="static" sx={{ 
        background: "linear-gradient(90deg, #EF5D70 58%, #EFD677 100%)"
      }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link href="/">
             <Image
                priority
                src={HlsVideo}
                width={180}
                alt="Home"
              />
            </Link>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            
            <Grid container justifyContent="space-around" sx={{mx:3}}>
              <NavLinks />
            </Grid>
            <Link href={'/login'}>
              <ButtonComponent text="Login" onClick={handleClick} />
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
  );
}
export default ResponsiveAppBar;