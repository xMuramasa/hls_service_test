"use client"

import React from "react";

import Link from 'next/link'
import Image from 'next/image'

import ButtonComponent from "@/app/ui/ButtonComponent";

import { Grid, Typography } from "@mui/material";


export default function Home() {
  
  var imageWidth = 1546;
  var imageHeight = 670;

  var renderedWidth = imageWidth;
  var renderedHeight = imageHeight;
  
  if (window !== undefined) {
  
    var windowWidth = window.innerWidth;
    var renderedWidth = imageWidth;
    var renderedHeight = imageHeight * (windowWidth / imageWidth);
  }

  return (
      <Grid container
        sx={{ 
          px: {xs: 5, md: 10, lg: 20 },
          py: {xs: 5, md: 10, lg: 15 }
         }}
      >
        <Grid container
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          style= {{
            backgroundImage: "url('/static/images/hero.png')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Grid container
            direction={"column"}
            alignItems={"flex-end"}
            sx={{ 
              height: imageHeight,
              width: renderedWidth/2.5,
              backdropFilter: "blur(7px)",
              backgroundColor: "rgba(0, 0, 0, 0.5)"
            }}
            p={10}
            >
              <Grid item xs sx={{ pb: 4 }}>
                <Typography sx={{ fontWeight:"bold", fontSize: {xs: "46px", md: "56px", lg: "66px"}, textAlign: "right" }}>
                  Videos como nunca
                </Typography>
                <Image
                  priority
                  src={'/static/svgs/splash.svg'}
                  width={renderedWidth/2.5}
                  height={imageHeight/2}
                  alt="MyHls"
                />
              </Grid>
              <Grid item  xs={3} >
                <Link href="/signUp">
                  <ButtonComponent text={"Crear Cuenta"} onClick={()=>{}} />
                </Link>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
  );
}