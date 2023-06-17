import $api from "../http/http";
import { AxiosResponse } from "axios"; // container of responce
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    // in promise we have Checker (interface) of what we will got from server
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> { 
        return $api.post('/login', {email, password}) // sending authorization
    }
}
