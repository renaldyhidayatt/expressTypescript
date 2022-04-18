import { Document } from 'mongoose';


export interface UserDocument extends Document {
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