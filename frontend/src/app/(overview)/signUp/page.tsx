"use client";

import React from 'react';
import axios from 'axios';

import { 
	FilledInput,
	FormControl, 
	Grid,
	IconButton, 
	InputAdornment,
	InputLabel,
	Paper
} from '@mui/material';


import Image from 'next/image';

import { Visibility, VisibilityOff } from '@mui/icons-material';

import { isEmptyOrUndefined } from '@/app/lib/utils';
import ButtonComponent from '@/app/ui/ButtonComponent';

import { User } from '@/app/lib/definitions';

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

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserData({...userData, [event.target.name]: event.target.value});
	}

  return (
	<Grid container justifyContent={"center"} >
			<Paper elevation={2} 
				sx={{ 
					maxWidth: '25vw', minHeight: '60vh', borderRadius: 5,
					backgroundColor: "#3A3838", mt: 4 }}
				>
				<Grid container direction={"column"} justifyContent={'center'} 
					alignItems={"center"} sx={{ p: 4, mt: 4 }}
				>
					<Grid item xs={12}>
						<Image
							priority
							src={'/static/svgs/CreateAcc.svg'}
							width={250}
							height={250}
							alt="Create an account"
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControl variant="standard" sx={styles.textBox}>
							<InputLabel>Email</InputLabel>
							<FilledInput
								name="Email"
								type={'text'}
								value={userData.Email}
								onChange={handleChange}
							/>
						</FormControl>
			
						<FormControl variant="standard" sx={styles.textBox}>
							<InputLabel>Name</InputLabel>
							<FilledInput
								name="Name"
								type={'text'}
								value={userData.Name}
								onChange={handleChange}
							/>
						</FormControl>

						<FormControl variant="standard" sx={styles.textBox} >
							<InputLabel>Password</InputLabel>
							<FilledInput
								name="Password"
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
								onChange={handleChange}
							/>
						</FormControl>						
					</Grid>
					<Grid item xs={12}>
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
		m: 4,
		backGroundColor: '#D9D9D9',
	},
}

export default CreateAccountForm;