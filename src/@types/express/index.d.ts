import { UserDocument } from "../../interface/models/user";

declare global {
    namespace Express {
        export interface Request {
            currentUser: Record<string, any>;
        }
    }
}