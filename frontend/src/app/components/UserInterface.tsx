"use client"

import React, { useState, useEffect, } from "react";

import axios from "axios";

import UserCardComponent from "./UserCardComponent";
import { Button, Grid } from "@mui/material";

import User from "../lib/definitions";
import CreateUserForm from "./CreateUserForm";
import UpdateUserForm from "./UpdateUserForm";
import LoginForm from "./LoginForm";

import Hls from "hls.js";

import { isEmptyOrUndefined, saveToLocalStorage, getFromLocalStorage } from "../lib/utils";

interface UserInterfaceProps {
}

const UserInterface: React.FC<UserInterfaceProps> = () => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
	const HlsSupported = Hls.isSupported();

	const [loginJWT, setLoginJWT] = useState(getFromLocalStorage('userData'));


	const [videoList, setVideoList] = useState([]);
	const [activeVideo, setActiveVideo] = useState('');

	const [userData, setUserData] = useState({ Email: '', Name: '', Password: '', Id: -1});


	const fetchVideos = async () => {
		try {
			if (loginJWT !== null || loginJWT !== undefined || loginJWT !== '') {
				const response = await axios.get(`${apiUrl}/videos`, {
					headers: {
						'Authorization': `${loginJWT}`,
					},
				})
				setVideoList(response.data.videos);
			}
		} catch (error) {
			console.log("Error While fetching Data", error);
		}
	}

	useEffect(()=>{
		if (loginJWT !== null) {
			saveToLocalStorage(loginJWT, 'userData');
			// fetchUsers();
		}
	}, [loginJWT]);

	// const updateUserData = async () => {
	// 	try {
	// 		await axios.post(`${apiUrl}/user/${updateUser.Id}`, updateUser);
	// 		fetchUsers();
	// 	} catch (error) {
	// 		console.log("Error While Creating User", error);
	// 	}
	// }

	return (
		<div>
		{ !isEmptyOrUndefined(loginJWT, 'string') ? 
			<Grid container spacing={1} direction={'column'}
				alignSelf={"center"} justifyItems={"center"} 
				alignItems={"center"}
			>
					<Grid item xs={12} container justifyContent={"space-between"}>
						<Grid item xs>
							<Button color="primary" variant="outlined" size="large"
								sx={{ textTransform: 'none' }}
								onClick={() => fetchVideos()}
								>
								Load Video List
							</Button>
						</Grid>
						<Grid item xs>
							<Button color="error" variant="outlined" size="large"
								sx={{ textTransform: 'none' }}
								onClick={() => localStorage.clear()}
								>
								Log Out
							</Button>
						</Grid>						
					</Grid>
					{ !isEmptyOrUndefined(videoList, 'array') ? 
						videoList?.map((v: any) => {
							return (
								<Grid key={v} item xs={12} container justifyContent={"space-between"}>
									<Button color="primary" variant="outlined" size="large"
										sx={{ textTransform: 'none' }}
										onClick={() => setActiveVideo(v.name)}
										>
										{v.name}
									</Button>
								</Grid>
							)
						}) : null
					}
					{/* <Grid item>
						<CreateUserForm newUser={newUser} setNewUser={setNewUser} createUser={createUser}/>
					</Grid>
					<Grid item>
						<UpdateUserForm updateUser={updateUser} setUpdateUser={setUpdateUser} updateUserData={updateUserData}/>
					</Grid> */}
					<Grid item>
						<video id="video" width="720" height="360" controls />
					</Grid>
				</Grid>
				: null
			}
		</div>

	)

}

export default UserInterface;
