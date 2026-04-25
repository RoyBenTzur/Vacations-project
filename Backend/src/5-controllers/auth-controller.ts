import express, { NextFunction, Request, Response, Router } from "express";
import { StatusCode } from "../3-models/enums";
import { UserModel } from "../3-models/user-model";
import { authService } from "../4-services/auth-service";

class AuthController {

    public router: Router = express.Router();

    // Register auth routes:
    public constructor() {
        this.router.post("/register", this.register);
        this.router.post("/login", this.login);
    }

    // Handle POST request and register a new user:
    private register = async (request: Request, response: Response, next: NextFunction) => {
        try {

            // Create user object from request body:
            const user = new UserModel(request.body);

            // Register the user:
            const registeredUser = await authService.register(user);

            // Return the created user:
            response.status(StatusCode.Created).json(registeredUser);
        }
        catch (err: any) {
            next(err);
        }
    };

    // Handle POST request and login existing user:
    private login = async (request: Request, response: Response, next: NextFunction) => {
        try {

            // Create user object from request body:
            const user = new UserModel(request.body);

            // Login the user:
            const loggedInUser = await authService.login(user);

            // Return the logged in user:
            response.status(StatusCode.OK).json(loggedInUser);
        }
        catch (err: any) {
            next(err);
        }
    };

}

export const authController = new AuthController();