import jwt, { type JwtPayload } from 'jsonwebtoken';
import Account from '~/server/models/Account';

export default defineEventHandler(async (event) => {
    // Récupérer les cookies de la requête
    const token = getCookie(event, 'auth_token');

    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Authorization token is required'
        });
    }
    let payload: JwtPayload;

    try {
        // Vérifier et décoder le token
        payload = jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtPayload;
    } catch (error) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid token'
        });
    }

    const { firstname, lastname } = await readBody(event);

    if (!firstname && !lastname) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Firstname or lastname must be provided'
        });
    }

    try {
        // Mettre à jour les informations du compte
        const updatedAccount = await Account.findOneAndUpdate(
            { mail: payload.email }, // On suppose que l'email est dans le payload du JWT
            {
                ...(firstname && { firstname }), // Mettre à jour seulement si `firstname` est fourni
                ...(lastname && { lastname }) // Mettre à jour seulement si `lastname` est fourni
            },
            { new: true } // Retourner le document mis à jour
        );

        if (!updatedAccount) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Account not found'
            });
        }

        return {
            success: true,
            message: 'Account updated successfully',
            account: updatedAccount
        };
    } catch (error) {
        console.error('Error updating account:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'An error occurred while updating the account'
        });
    }
});
