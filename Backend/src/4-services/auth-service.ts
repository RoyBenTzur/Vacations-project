import { dal } from "../2-utils/dal";
import { UnauthorizedError, ValidationError } from "../3-models/client-errors";
import { UserModel } from "../3-models/user-model";

class AuthService {

    // Register a new user
    public async register(user: UserModel): Promise<UserModel> {

        // Validate user data before registration
        const error = user.validateRegister();
        if (error) throw new ValidationError(error);

        // Check if email is already taken
        const sql = `
        SELECT id
        FROM users
        WHERE email = ?`;

        const existingUsers = await dal.execute(sql, [user.email]);

        if (existingUsers.length > 0) {
            throw new ValidationError("Email is already taken.");
        }

        // Set default role to regular user
        user.roleId = 2;

        // SQL query to insert a new user
        const insertSql = `
        INSERT INTO users
        VALUES(DEFAULT, ?, ?, ?, ?, ?)`;

        // Values to insert into the database
        const values = [
            user.firstName,
            user.lastName,
            user.email,
            user.password,
            user.roleId
        ];

        // Execute the insert query
        const result: any = await dal.execute(insertSql, values);

        // Set the generated id from the database
        user.id = result.insertId;

        // Return the created user object
        return user;
    }

    // Login existing user
    public async login(user: UserModel): Promise<UserModel> {

        // Validate user data before login
        const error = user.validateLogin();
        if (error) throw new ValidationError(error);

        // SQL query to find matching user
        const sql = `
        SELECT
        id,
        first_name AS firstName,
        last_name AS lastName,
        email,
        password,
        role_id AS roleId
        FROM users
        WHERE email = ?
        AND password = ?`;

        // Execute the query
        const users = await dal.execute(sql, [user.email, user.password]);

        // Get the first matching user
        const loggedInUser = users[0] as UserModel;

        // If user not found - credentials are invalid
        if (!loggedInUser) {
            throw new UnauthorizedError("Incorrect email or password.");
        }

        // Return the logged in user
        return loggedInUser;
    }

}

export const authService = new AuthService();