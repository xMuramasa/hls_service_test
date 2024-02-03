"use client"

import React from 'react';

import {
	Button,
} from "@mui/material";

import { ButtonProps } from '@/app/lib/definitions';

const ButtonComponent: React.FC<ButtonProps> = ({ text, onClick = undefined }) => {
	return (
		<Button variant={'contained'} size={'large'}
			sx={{ minWidth: '200px', maxWidth:'230px', backgroundColor: '#EF426F', ":hover": { backgroundColor: '#EF5D70' }}}
			type='submit'
			onClick={onClick}
		>
			{text}
		</Button>
	);
}

export default ButtonComponent;