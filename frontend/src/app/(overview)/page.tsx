import React from "react";

import Link from 'next/link'

import { isEmptyOrUndefined, getFromLocalStorage } from "../lib/utils";

import UserInterface from "@/app/components/UserInterface";
import Login from "../login/page";
import { Grid } from "@mui/material";

export default function Home() {

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <p>AAAAAAAAAAAAAA</p>
      </Grid>
      <Grid item xs={12} sm={6}>
        <p>AAAAAAAAAAAAAA</p>
      </Grid>
    </Grid>
  );
}
