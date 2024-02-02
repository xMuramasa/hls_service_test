"use client"

import React from 'react';

import axios from 'axios';

import { 
	Autocomplete,
	Box,
	Button,
	FilledInput,
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

import { useRouter } from "next/navigation";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Image from 'next/image';

import { default as LoginSVG } from '../../../public/login.svg';

import ButtonComponent from '@/app/ui/ButtonComponent';
import Link from 'next/link';

import { isEmptyOrUndefined } from  '../lib/utils';
import User from '../lib/definitions';


interface LoginFormProps {
}

const LogIn = async (userData: User, apiUrl: string) => {
	if(!isEmptyOrUndefined (userData.Email, 'string')
		&& !isEmptyOrUndefined(userData.Password, 'string'))
	{
		const response = await axios.post(`${apiUrl}/login`, userData);
		if(response.status === 200){
			document.cookie = `token=${response.data.token}; path=/`;
			return true
		} 
		return false;
	} else {
		alert('Por favor, rellene todos los campos');
	}
}

const LoginForm: React.FC<LoginFormProps> = () => {
	const router = useRouter();

	const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
	
	const [userData, setUserData] = React.useState({'Email': '', 'Password': '', 'Id': -1, 'Name': ''});
	const [showPassword, setShowPassword] = React.useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleClick = () => {
		LogIn(userData, apiUrl).then((response) => {
			if(response){
				router.push('/myHls');
			} else {
				alert('Usuario o contraseña incorrectos');
			}
		});
	}

	return (
		<Grid container justifyContent={"center"} >
			<Paper elevation={2} 
				sx={{ 
					maxWidth: '25vw', minHeight: '60vh', borderRadius: 5,
					backgroundColor: "#3A3838", mt: 4 }}
				>
				<Grid container direction={"column"} justifyContent={'center'} 
					alignItems={"center"} sx={{ p: 4, mt: 6 }}
				>
					<Grid item xs={12}>
						<Image
							priority
							src={LoginSVG}
							width={250}
							alt="Create an account"
						/>
					</Grid>
					<Grid item xs={12} >
						<FormControl sx={styles.textBox}>
							<InputLabel>Email</InputLabel>
							<FilledInput
								id="email"
								type={'text'}
								value={userData.Email}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									setUserData({...userData, Email: event.target.value});
								}}
								/>
						</FormControl>
						<FormControl sx={styles.textBox}>
							<InputLabel>Password</InputLabel>
							<FilledInput
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
					<Grid item xs={12}>
						<ButtonComponent text={"Iniciar Sesion"} onClick={handleClick} />
					</Grid>
				</Grid>
				<Grid container justifyContent={"center"} alignItems={"flex-end"}>
					<Link href={'/signUp'} > 
						<Typography variant={'h6'} sx={{ color: '#fff' }}>
								¿No tienes cuenta?  &nbsp; <u> Registrame Ahora! </u>
						</Typography>
					</Link>
				</Grid>
			</Paper>
		</Grid>
	)

}


const styles = {
	textBox: {
		width: '80%',
		m: 4,
		backGroundColor: '#D9D9D9',
	},
}

export default LoginForm;