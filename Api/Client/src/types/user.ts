export interface IUser {
    ID: string;
    role: string;
    name: string;
    email: string;
    phone: string;
    isDeleted: boolean;
}

export interface IUserForm {
    name: string;
    email: string;
    phone: string;
}