"use client"

import React, { useState, useEffect, } from "react";

import axios from "axios";

import CardComponent from "./CardComponent";
import { Button, Grid } from "@mui/material";

import User from "../interfaces/User";
import CreateUserForm from "./CreateUserForm";
import UpdateUserForm from "./UpdateUserForm";
import LoginForm from "./LoginForm";

import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";
import { get } from "http";

interface UserInterfaceProps {
	backendName: string;
}

const UserInterface: React.FC<UserInterfaceProps> = () => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

	const [loginJWT, setLoginJWT] = useState(getFromLocalStorage('userData'));

	const [users, setUsers] = useState<User[]>([]);
	const [userData, setUserData] = useState({ Email: '', Name: '', Password: '', Id: -1});
	const [newUser, setNewUser] = useState({ Email: '', Name: '', Password: '', Id: -1});
	const [updateUser, setUpdateUser] = useState({ Id: '', Email: '', Name: '', Password: ''});
	
	// fetch users from backend
	const fetchUsers = async () => {
		try {
			if (loginJWT !== null || loginJWT !== undefined || loginJWT !== '') {
				const response = await axios.get(`${apiUrl}/users`, {
					headers: {
						'Authorization': `${loginJWT}`,
					},
				})
				setUsers(response.data.users);
			}
		} catch (error) {
			console.log("Error While fetching Data", error);
		}
	}

	const login = async () => {
		try {
			const response = await axios.post(`${apiUrl}/login`, userData);
			setLoginJWT(response.data.token);
		} catch (error) {
			console.log("Error While Logging In", error);
		}
	}

	useEffect(()=>{
		if (loginJWT !== null) {
			saveToLocalStorage(loginJWT, 'userData');
			fetchUsers();
		}
	}, [loginJWT]);

	// create user
	const createUser = async () => {
		try {
			const response = await axios.post(`${apiUrl}/signup`, newUser);
			setUsers([...users, response.data.user]);
		} catch (error) {
			console.log("Error While Creating User", error);
		}
	}

	const updateUserData = async () => {
		try {
			await axios.post(`${apiUrl}/user/${updateUser.Id}`, updateUser);
			fetchUsers();
		} catch (error) {
			console.log("Error While Creating User", error);
		}
	}

	return (
		<Grid container spacing={1} direction={'column'}
			alignSelf={"center"} justifyItems={"center"} 
			alignItems={"center"}
			bgcolor={'cyan'}
		>
			{ loginJWT ? 
				<>
					<Grid item>
						<Button color="primary" variant="contained" size="large"
							sx={{ textTransform: 'none' }}
							onClick={() => setLoginJWT(null)}
							>
							Log Out
						</Button>
					</Grid>
					<Grid item>
						<CreateUserForm newUser={newUser} setNewUser={setNewUser} createUser={createUser}/>
					</Grid>
					<Grid item>
						<UpdateUserForm updateUser={updateUser} setUpdateUser={setUpdateUser} updateUserData={updateUserData}/>
					</Grid>


					<Grid item container xs={12} spacing={1} p={1}>

						{ users && Object.keys(users).length !== 0 ? 
							users.map((user) => (
								<Grid item xs key={user.Id}>
									<CardComponent card={user} />
								</Grid>
							))
							: null
						}
					</Grid>
				</>
				:
				<Grid item>
					<LoginForm userData={userData} setUserData={setUserData} logIn={login}/>
				</Grid>
			}
		</Grid>
	)

}

export default UserInterface;
