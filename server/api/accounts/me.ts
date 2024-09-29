import jwt, { type JwtPayload } from 'jsonwebtoken';
import Account from "~/server/models/Account";

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');

    if (!token) {
        console.log("BACK: No token found");
        return {
            isAuthenticated: false,
            message: 'Not connected',
            profile: null,
        };
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        // Assurez-vous que decoded contient bien un userId
        if (typeof decoded === 'object' && decoded.userId) {
            const user = await Account.findById(decoded.userId).select('-password'); // Ne pas retourner le mot de passe

            if (!user) {
                console.log("BACK: User not found");
                return {
                    isAuthenticated: false,
                    message: 'User not found',
                    profile: null,
                };
            }

            return {
                isAuthenticated: true,
                profile: {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    mail: user.mail,
                    locale: user.locale,
                },
            };
        } else {
            return {
                isAuthenticated: false,
                message: 'Invalid token',
                profile: null,
            };
        }
    } catch (error) {
        return {
            isAuthenticated: false,
            message: 'Invalid token',
            profile: null,
        };
    }
});
