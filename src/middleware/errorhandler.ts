import { Request, Response, NextFunction, Errback } from 'express';

function ErrorHandler(err: Errback, req: Request, res: Response, next: NextFunction) {
    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: "The user is not authorized" })
    }

    if (err.name === 'ValidationError') {
        //  validation error
        return res.status(401).json({ message: err })
    }

    // default to 500 server error
    return res.status(500).json(err);
}

export default ErrorHandler;