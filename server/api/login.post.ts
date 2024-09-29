import jwt from 'jsonwebtoken';
import { authenticateUser } from '~/server/services/accountsService';
import { defineEventHandler, createError, send, readBody, setCookie } from 'h3';
import {useEnvironment} from "~/composables/useEnvironment";

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);

    if (!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and password are required',
        });
    }

    try {
        const user = await authenticateUser(email, password);

        const jwtToken = jwt.sign(
            {userId: user._id, email: user.email},
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        );

        setCookie(event, 'auth_token', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 1 semaine
        });

        return send(event, JSON.stringify({ message: 'Login successful' }));
    } catch (error: any) {
        if (error.message === 'Invalid email or password.') {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid email or password',
                statusText: useEnvironment().isDev ? error.stack : "",
            });
        } else if (error.message === 'secretOrPrivateKey must have a value') {
            throw createError({
                statusCode: 500,
                statusMessage: 'Server configuration error: missing JWT secret',
                statusText: useEnvironment().isDev ? error.stack : "",
            });
        } else {
            // Pour toutes les autres erreurs, on renvoie un statut générique
            throw createError({
                statusCode: 500,
                statusMessage: 'app.error',
                statusText: useEnvironment().isDev ? error.stack : "",
            });
        }
    }
});
