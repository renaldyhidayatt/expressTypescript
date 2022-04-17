import jwt from 'jsonwebtoken';

class JwtToken {
    createJwt = (id: string): string => {
        const secret = process.env.JWT_SECRET;
        const jwtExpiret = process.env.EXPIRES_IN;

        if (!secret) {
            throw new Error("No jwt")
        }

        if (!jwtExpiret) {
            throw new Error("No jwtExpiret")
        }

        return jwt.sign({ id: id }, secret, { expiresIn: jwtExpiret })
    }

    decodeJwt = (token: string): any => {
        try {
            const secret = process.env.JWT_SECRET;

            if (!secret) {
                throw new Error("No jwt");
            }

            return jwt.verify(token, secret);
        } catch (err) {
            throw new Error(`Error decoding jwt ${err}`)
        }
    }
}


export default new JwtToken();