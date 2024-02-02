"use client"

import React from 'react';

import {
    Button,
} from "@mui/material";

import { voidFunc } from '../lib/definitions';

interface ButtonProps {
    text: string;
    onClick: voidFunc;
}

const ButtonComponent: React.FC<ButtonProps> = ({ text, onClick }) => {
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