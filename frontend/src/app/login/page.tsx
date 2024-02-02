"use client"

import React from 'react';

import { 
	Autocomplete,
	Box,
	Button,
	FormControl,
	Grid,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
	Paper,
	TextField,
	Typography
} from "@mui/material";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { changeState, voidFunc, User } from "../lib/definitions";


const LoginForm: React.FC<{userData: User, setUserData: changeState, logIn: voidFunc }> = 
	({ userData, setUserData, logIn }) => {

	const [showPassword, setShowPassword] = React.useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const LogIn = () => {
		if(userData.Email === '' || userData.Password === ''){
			alert('Please fill all the fields');
		} else {
			logIn();
		}
	}

	return (
		<Paper elevation={2}>
			<Typography variant="h5" align="center" sx={{ p: 2 }}>
				Log In
			</Typography>
			<Grid container direction={"column"} m={2} >
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
				<Grid container
					justifyContent={'flex-end'} alignItems={'center'}
					sx={[styles.textBox, { p: 2 }]}
					>
					<Button color="primary" variant="outlined" size="large"
						sx={{ textTransform: 'none' }}
						onClick={LogIn}
						>
						Log In
					</Button>
				</Grid>
			</Grid>
		</Paper>
	)

}

const styles = {
	textBox: {
		width: '330px',
		m: 1,
		p: 1,
	},
}

export default LoginForm;