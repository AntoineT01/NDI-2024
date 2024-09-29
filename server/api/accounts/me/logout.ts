export default defineEventHandler(async (event) => {
    // Supprimer le cookie d'authentification en définissant une date d'expiration dans le passé
    setCookie(event, 'auth_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',  // Appliquer cette règle à l'ensemble du site
        expires: new Date(0),  // Définit la date d'expiration dans le passé pour supprimer le cookie
    });

    // Retourner une réponse JSON confirmant la déconnexion
    return {
        statusCode: 200,
        message: 'Logout successful',
    };
});
