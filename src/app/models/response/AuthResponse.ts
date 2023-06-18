import { IUser } from "../IUser";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    // user (userDto) have its own interface
    user: IUser;
}