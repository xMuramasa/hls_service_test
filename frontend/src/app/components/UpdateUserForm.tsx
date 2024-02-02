"use client"

import React from "react";
import {
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



const UpdateUserForm: React.FC<{updateUser: User, setUpdateUser: changeState, updateUserData: voidFunc }> = 
	({ updateUser, setUpdateUser, updateUserData }) => {

	const [showPassword, setShowPassword] = React.useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	return (
		<Paper elevation={2}>
			<Typography variant="h5" align="center" sx={{ p: 2 }}>
				Update User
			</Typography>
			<Grid container direction={"column"} m={2} >
				<FormControl variant="standard" sx={styles.textBox}>
					<InputLabel>Name</InputLabel>
					<Input
						id="name"
						type={'text'}
						value={updateUser.Name}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setUpdateUser({...updateUser, Name: event.target.value});
						}}
						/>
				</FormControl>
				<FormControl variant="standard" sx={styles.textBox}>
					<InputLabel>Email</InputLabel>
					<Input
						id="email"
						type={'text'}
						value={updateUser.Email}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setUpdateUser({...updateUser, Email: event.target.value});
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
						value={updateUser.Password}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setUpdateUser({...updateUser, Password: event.target.value});
						}}
						/>
				</FormControl>
				<Grid container
					justifyContent={'flex-end'} alignItems={'center'}
					sx={[styles.textBox, { p: 2 }]}
					>
					<Button color="primary" variant="outlined" size="large"
						sx={{ textTransform: 'none' }}
						onClick={updateUserData}
						>
						Save Changes
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

export default UpdateUserForm;
