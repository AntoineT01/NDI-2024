import bcrypt from 'bcrypt';
import Account from '~/server/models/Account';

/**
 * Authentifie un utilisateur avec son e-mail et son mot de passe.
 * @param email - L'adresse e-mail de l'utilisateur.
 * @param password - Le mot de passe de l'utilisateur.
 */
export const authenticateUser = async (email: string, password: string) => {
    const account = await Account.findOne({ mail: email });
    if (!account) {
        throw new Error('sign_in.invalid_credentials');
    }

    // Comparaison du mot de passe haché
    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
        throw new Error('sign_in.invalid_credentials');
    }

    // Mise à jour de la date du dernier login
    account.last_login_at = new Date();
    await account.save();

    return account;
};

/**
 * Met à jour les informations d'un compte.
 * @param accountId - L'ID du compte à mettre à jour.
 * @param updateData - Les données à mettre à jour.
 */
export const updateAccount = async (accountId: string, updateData: any) => {
    const account = await Account.findById(accountId);
    if (!account) {
        throw new Error('Account not found.');
    }

    // Mise à jour des champs spécifiques
    Object.keys(updateData).forEach(key => {
        account[key] = updateData[key];
    });

    account.updated_at = new Date();
    return await account.save();
};

/**
 * Supprime logiquement un compte (soft delete).
 * @param accountId - L'ID du compte à supprimer.
 */
export const deleteAccount = async (accountId: string) => {
    const account = await Account.findById(accountId);
    if (!account) {
        throw new Error('Account not found.');
    }

    // Marque le compte comme supprimé (soft delete)
    account.deleted_at = new Date();
    account.active = false;
    account.firstname = null;
    account.lastname = null;
    account.password = null;

    return await account.save();
};
