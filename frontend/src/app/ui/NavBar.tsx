"use client";

import * as React from 'react';

import {
  AppBar,
  Container,
  Button,
  Toolbar,
  Typography,
  Grid,
} from '@mui/material';

import AdbIcon from '@mui/icons-material/Adb';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NavLinks from './nav-links';

import Image from 'next/image';
import { default as HlsVideo } from '../../../public/HlsVideo.svg';

function ResponsiveAppBar({ children }: { children: React.ReactNode }) {

  const handleClick = () => {
    console.info('You clicked the user menu.');
  }

  return (
    <div>
      <AppBar position="static" sx={{ 
        background: "linear-gradient(90deg, #EF5D70 58%, #EFD677 100%)"
      }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
             <Image
                priority
                src={HlsVideo}
                width={180}
                alt="Home"
              />
            
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            
            <Grid container justifyContent="space-around" sx={{mx:3}}>
              <NavLinks />
            </Grid>

            <form>
              <Button variant={'contained'} size={'large'}
                sx={{ minWidth: '200px' }} color='primary'
              >
                Iniciar Sesion
              </Button>
            </form>
          </Toolbar>
        </Container>
      </AppBar>
      { children }
    </div>

  );
}
export default ResponsiveAppBar;