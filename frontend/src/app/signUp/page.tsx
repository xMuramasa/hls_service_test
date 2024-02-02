"use client";

import React from 'react';
import { FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Paper, Typography } from '@mui/material';

import axios from 'axios';

import Image from 'next/image';
import Link from 'next/link';

import CreateAccountSVG from '../../../public/CreateAcc.svg';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ButtonComponent from '@/app/ui/ButtonComponent';


import { isEmptyOrUndefined } from '../lib/utils';
import User from '../lib/definitions';

interface CreateAccountFormProps {
}

const createUser = async (newUser: User, apiUrl: string) => {
		try {
			if (!isEmptyOrUndefined(newUser.Email, 'string')
				&& !isEmptyOrUndefined(newUser.Password, 'string')
				&& !isEmptyOrUndefined(newUser.Name, 'string')){
					
					const response = await axios.post(`${apiUrl}/signup`, newUser);
					if(response.status === 200){
						console.log(response.data);
					}
				} else {
					alert('Por favor, rellene todos los campos');
				}
		} catch (error) {
			alert("Hubo un error :c");
		}
	}

const CreateAccountForm: React.FC<CreateAccountFormProps> = () => {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

	const [userData, setUserData] = React.useState({'Email': '', 'Password': '', 'Id': -1, 'Name': ''});

  const [showPassword, setShowPassword] = React.useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClick = () => {
		createUser(userData, apiUrl);
	}

  return (
	<Grid container justifyContent={"center"} sx={{ mt:12 }}>
			<Paper elevation={2} sx={{ maxWidth: '25vw', minHeight: '60vh', borderRadius: 5, backgroundColor: "#3A3838" }}>
				<Grid container direction={"column"} justifyContent={'space-evenly'} alignItems={"center"} >
					<Grid item xs={12}>
						<Image
							priority
							src={CreateAccountSVG}
							width={250}
							alt="Create an account"
						/>
					</Grid>
					<Grid item xs>
						<FormControl variant="standard" sx={styles.textBox}>
							<InputLabel>Email</InputLabel>
							<Input
								id="email"
								type={'text'}
								value={userData.Email}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									setUserData({...userData, Email: event.target.value});
								}}
								/>
						</FormControl>
			
						<FormControl variant="standard" sx={styles.textBox}>
							<InputLabel>Name</InputLabel>
							<Input
								id="name"
								type={'text'}
								value={userData.Name}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									setUserData({...userData, Name: event.target.value});
								}}
							/>
						</FormControl>

						<FormControl variant="standard" sx={styles.textBox}>
							<InputLabel>Password</InputLabel>
							<Input
								id="pwd"
								type={showPassword ? 'text' : 'password'}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											edge="end"
											>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								value={userData.Password}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									setUserData({...userData, Password: event.target.value});
								}}
								/>
						</FormControl>						
					</Grid>
					<Grid item xs>
						<ButtonComponent text={"Registrame!"} onClick={handleClick} />
					</Grid>
				</Grid>
			</Paper>
		</Grid>
  );
}

const styles = {
	textBox: {
		width: '80%',
		mt: 12,
		p: 1,
	},
}

export default CreateAccountForm;