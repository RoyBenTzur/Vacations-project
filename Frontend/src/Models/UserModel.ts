// User model representing a logged-in user:

export class UserModel {

    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public roleId: number;

    public constructor(user: any) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.roleId = user.roleId;
    }
}