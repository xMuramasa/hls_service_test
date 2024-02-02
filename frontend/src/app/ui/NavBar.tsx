"use client";

import * as React from 'react';

import {
  AppBar,
  Container,
  Toolbar,
  Grid,
} from '@mui/material';

import NavLinks from './nav-links';

import Image from 'next/image';
import Link from 'next/link';

import HlsVideo from '../../../public/HlsVideo.svg';

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
            <Grid container justifyContent={"space-between"} alignItems={"center"}>
            <Grid item>
              <Link href="/">
              <Image
                  priority
                  src={HlsVideo}
                  width={180}
                  alt="Home"
                />
              </Link>

            </Grid>
            
            <Grid item xs container justifyContent="space-around" sx={{mx:3}}>
              <NavLinks />
            </Grid>
            <Grid item>
              <Link href={'/login'}>
                <ButtonComponent text="Iniciar Sesion"  onClick={handleClick} />
              </Link>
            </Grid>
            </Grid>

          </Toolbar>
        </Container>
      </AppBar>
  );
}
export default ResponsiveAppBar;