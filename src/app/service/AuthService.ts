import $api from "../http/http";
import { AxiosResponse } from "axios"; // container of response
import { AuthResponse } from "../models/response/AuthResponse";

//! add trycatch
//? learn syntaxis better
export default class AuthService {
    // in promise we have generic which contains interface of what we will got from server
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> { 
        return $api.post<AuthResponse>('/login', {email, password}) // sending authorization
        //* We need this generic here to see what it will contain for exmp here:
        //* .then(res => res.data.)
    }
    
    // in promise we have generic which contains interface of what we will got from server
    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> { 
        return $api.post<AuthResponse>('/registration', {email, password}) // sending authorization
    }
    
    // in promise we have void!
    static async logout(): Promise<void> { 
        return $api.post('/logout') // sending authorization
    }
}
