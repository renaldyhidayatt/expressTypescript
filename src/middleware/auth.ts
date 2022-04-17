import { Request, Response, NextFunction } from 'express';
import JwtPkg from '../pkg/jwt';
import serviceAuth from '../service/service.auth';

function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        token = req.headers.authorization.split(' ')[1];
    if (!token) {
        throw new Error("No token")
    }

    try {
        const decoded = JwtPkg.decodeJwt(token);
        const user = serviceAuth.findByid(decoded.id);

        req.currentUser = user
        next();
    } catch (err) {
        throw new Error(`Error decoding jwt ${err}`)
    }
}

export default AuthMiddleware;