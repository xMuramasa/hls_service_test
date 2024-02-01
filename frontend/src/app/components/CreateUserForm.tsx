"use client"

import React from "react";

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

import { changeState, voidFunc, User } from "../interfaces/Interfaces";

const CreateUserForm: React.FC<{newUser: User, setNewUser: changeState, createUser: voidFunc }> = 
	({ newUser, setNewUser, createUser }) => {

	const [showPassword, setShowPassword] = React.useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const Create = () => {
		if(newUser.Email === '' || newUser.Name === '' || newUser.Password === ''){
			alert('Please fill all the fields');
		} else {
			createUser();
		}
	}

	return (
		<Paper elevation={2}>
			<Typography variant="h5" align="center" sx={{ p: 2 }}>
				Create User
			</Typography>
			<Grid container direction={"column"} m={2} >
				<FormControl variant="standard" sx={styles.textBox}>
					<InputLabel>Name</InputLabel>
					<Input
						id="name"
						type={'text'}
						value={newUser.Name}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setNewUser({...newUser, Name: event.target.value});
						}}
						/>
				</FormControl>
				<FormControl variant="standard" sx={styles.textBox}>
					<InputLabel>Email</InputLabel>
					<Input
						id="email"
						type={'text'}
						value={newUser.Email}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setNewUser({...newUser, Email: event.target.value});
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
						value={newUser.Password}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setNewUser({...newUser, Password: event.target.value});
						}}
						/>
				</FormControl>
				<Grid container
					justifyContent={'flex-end'} alignItems={'center'}
					sx={[styles.textBox, { p: 2 }]}
					>
					<Button color="primary" variant="outlined" size="large"
						sx={{ textTransform: 'none' }}
						onClick={Create}
						>
						Create Account
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

export default CreateUserForm;
