export interface IUser {
    name: string;
    email: string;
    passwordHash: string;
    phone: string;
    street: string;
    apartment: string;
    zip: string;
    city: string;
    country: string;
}

export interface IAuth{
    email: string;
    password: string;
}