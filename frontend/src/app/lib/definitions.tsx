export interface User {
    Id: any;
    Email: string;
    Name: string;
    Password: any;
}

export interface Video {
    fileId: string;
}

export type voidFuncPromise = () => Promise<void>;
export type voidFunc = () => void;

export type changeState = (params: any) => any;

export default User;