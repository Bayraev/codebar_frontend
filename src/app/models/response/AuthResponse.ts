import { IUser } from "../IUser";

export interface AuthResponse {
    accessToken: string;
    refreshtoken: string;
    // user (userDto) have its own interface
    user: IUser;
}