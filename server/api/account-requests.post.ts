import {defineEventHandler, readBody, createError} from 'h3';
import AccountRequest from '~/server/models/AccountRequest';
import Account from '~/server/models/Account';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const {token} = body;

    if (!token) {
        throw createError({
            statusCode: 400,
            statusMessage: 'account.activation.error.token_required',
        });
    }

    // 1. Trouver la requête de compte associée au token
    let accountRequest;
    try {
        accountRequest = await AccountRequest.findOne({token, request_type: 'SIGNUP'});

        if (!accountRequest) {
            throw new Error('account.activation.error.request_not_found');
        }

        // Vérifier si la requête a expiré
        if (accountRequest.expiration_date < new Date()) {
            throw new Error('account.activation.error.request_expired');
        }
    } catch (error) {
        console.error('Error finding account request:', error);
        throw createError({
            statusCode: 400,
            statusMessage: 'account.activation.error.token_invalid_or_expired',
        });
    }

    // 2. Activer le compte associé
    try {
        await Account.findByIdAndUpdate(accountRequest.account_id, {active: true});
    } catch (error) {
        console.error('Error activating account:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'account.activation.error.activation_failed',
        });
    }

    // 3. Supprimer la requête après traitement (optionnel mais recommandé)
    try {
        await AccountRequest.findByIdAndDelete(accountRequest._id);
    } catch (error) {
        console.error('Error deleting account request:', error);
    }

    // 4. Retourner une réponse appropriée
    return {success: true, message: 'account.activation.success.account_activated'};
});
