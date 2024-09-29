import jwt from 'jsonwebtoken';
import { defineEventHandler, getCookie, sendRedirect } from 'h3';

export default defineEventHandler(async (event) => {
    const publicRoutes = [
        '/contact',
        '/',
        '/api/accounts/me',
        '/api/accounts/me/logout',
        '/api/contact',
        '/api/login'
    ];

    const unAuthenticatedRoutesOnly = [
        '/sign-in',
    ]

    const currentPath = event.node.req.url || ''; // Récupère l'URL actuelle

    // Vérifie si le chemin correspond à une route publique ou commence par /email-verification
    if (publicRoutes.includes(currentPath) || currentPath.startsWith('/email-verification')) {
        return; // Si la route est publique ou correspond au début de /email-verification, laisse l'utilisateur accéder
    }
    // Vérifie la présence du token dans le cookie
    const token = getCookie(event, 'auth_token');

    if (!token) {
        if (unAuthenticatedRoutesOnly.includes(currentPath)) {
            // Route non authentifiée, laisse l'utilisateur accéder
            return;
        }
        // Si la route commence par /api, renvoyer une réponse JSON au lieu de rediriger
        if (currentPath.startsWith('/api')) {
            return {
                statusCode: 401,
                message: 'Non autorisé',
            };
        }
        // Sinon, redirige vers la page de connexion
        return sendRedirect(event, '/sign-in');
    }

    try {
        event.context.user = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string }; // Stocke les informations utilisateur dans le contexte
    } catch (error) {
        // En cas d'erreur de vérification du token, traiter selon le type de requête
        if (currentPath.startsWith('/api')) {
            return {
                statusCode: 401,
                message: 'Non autorisé',
            };
        }
        return sendRedirect(event, '/sign-in');
    }

    // Si l'utilisateur est authentifié, laisse-le accéder à la route, sauf si c'est dans la liste des routes non
    // authentifiées.
    if (unAuthenticatedRoutesOnly.includes(currentPath)) {
        return sendRedirect(event, '/');
    }
});
