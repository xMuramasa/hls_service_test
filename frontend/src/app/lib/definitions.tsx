export interface User {
    Id: any;
    Email: string;
    Name: string;
    Password: any;
}

export interface ButtonProps {
    text: string;
    onClick: voidFunc;
}

export interface Video {
    fileId: string;
}

export interface VideoCard {
    Id: string;
	Name: string,
	Description: string,
	Thumbnail: string | any,
	Video: string,
	activeFunc: changeState
}

export type voidFuncPromise = () => Promise<void>;

export type voidFunc = () => void;

export type changeState = (params: any) => any;
