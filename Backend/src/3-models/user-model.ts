import Joi from "joi";

// User model representing one user:
export class UserModel {

    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: number;

    public constructor(user: any) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    // Validation schema for user registration:
    private static registerValidationSchema = Joi.object({
        id: Joi.number().optional(),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(4),
        roleId: Joi.number().optional()
    });

    // Validation schema for user login:
    private static loginValidationSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(4)
    });

    // Validates user before registration:
    public validateRegister(): string {
        const result = UserModel.registerValidationSchema.validate(this);
        return result.error?.message || "";
    }

    // Validates user before login:
    public validateLogin(): string {
        const result = UserModel.loginValidationSchema.validate({
            email: this.email,
            password: this.password
        });
        return result.error?.message || "";
    }

}