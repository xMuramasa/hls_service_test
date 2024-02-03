"use client";

import * as React from 'react';

import {
  AppBar,
  Container,
  Toolbar,
  Grid,
  Menu,
  IconButton,
  Avatar,
  Typography,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import Image from 'next/image';
import Link from 'next/link';

import ButtonComponent from '@/app/ui/ButtonComponent';
import NavLinks from '@/app/ui/NavLinks';


function ResponsiveAppBar({ Type }: { Type: string }) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
		document.cookie = `token=`;
  }
  
  return (
    <AppBar position="static" sx={{ 
      background: "linear-gradient(90deg, #EF5D70 58%, #EFD677 100%)"
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid container alignItems={"center"}>
          { Type === 'home' || Type === 'login' ?
            <Grid item xs={3}>
              <Link href="/">
                <Image
                    priority
                    src={'/static/svgs/Logo.svg'}
                    width={180}
                    height={60}
                    alt="Home"
                  />
                </Link>
            </Grid>
            :
              <Grid item xs={3} container alignItems={"center"}>
                <Avatar sx={{ width: 56, height: 56 }}>
                  <Image
                    priority
                    src={'/static/images/profile.png'}
                    width={80}
                    height={60}
                    alt="Home"
                    />
                </Avatar>
                <Typography variant="h6" component="div" sx={{ ml: 2, color: "#fff" }}>
                  Usuario
                </Typography>
              </Grid>
          }
          <Grid item xs container sx={{ display: { xs: 'none', md: 'block' } }}>
            <NavLinks />
          </Grid>
          { Type === 'home' ?
            <Grid item xs={1} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Link href={'/login'}>
                <ButtonComponent text="Iniciar Sesion"  onClick={()=>{}} />
              </Link>
            </Grid>
            : Type === 'user' ?
            <Grid item xs={1} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Link href={'/'}>
                <ButtonComponent text="Cerrar Sesion" onClick={handleLogout} />
              </Link>
            </Grid>
            : null
          }
          </Grid>

           <Grid sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <NavLinks />
              <Grid item xs>
                <Link href={'/login'}>
                  <ButtonComponent text="Iniciar Sesion"  onClick={()=>{}} />
                </Link>
              </Grid>
            </Menu>
          </Grid>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;