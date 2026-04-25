import axios from "axios";
import { UserModel } from "../Models/UserModel";
import { appConfig } from "../Utils/AppConfig";

class AuthService {

    // Send register request to the server:
    public async register(firstName: string, lastName: string, email: string, password: string): Promise<UserModel> {
        const user = { firstName, lastName, email, password };
        const response = await axios.post<any>(appConfig.registerUrl, user);
        const registeredUser = new UserModel(response.data);
        return registeredUser;
    }

    // Send login request to the server:
    public async login(email: string, password: string): Promise<UserModel> {
        const credentials = { email, password };
        const response = await axios.post<any>(appConfig.loginUrl, credentials);
        const user = new UserModel(response.data);
        localStorage.setItem("user", JSON.stringify(user));
        return user;
    }

    // Remove the logged-in user from storage:
    public logout(): void {
        localStorage.removeItem("user");
    }

    // Get the logged-in user from storage:
    public getUser(): UserModel | null {
        const json = localStorage.getItem("user");
        if (!json) return null;
        const user = JSON.parse(json);
        return new UserModel(user);
    }
}

export const authService = new AuthService();