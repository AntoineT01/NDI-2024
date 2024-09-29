import Profile from '~/server/models/Profile';
import Account from '~/server/models/Account';
import hashPassword from "~/server/utils/passwordUtils";

async function populateAccounts() {
    try {
        // Récupération des profils existants
        const adminProfile = await Profile.findOne({ label: 'Administrator' });
        const userProfile = await Profile.findOne({ label: 'Normal' });

        if (!adminProfile || !userProfile) {
            console.error('Required profiles not found');
            return;
        }

        // Liste des comptes à insérer
        const accounts = [
            {
                profile_id: adminProfile._id,
                firstname: 'The',
                lastname: 'Admin',
                mail: 'admin@example.com',
                password: await hashPassword('123456'),
                locale: 'fr',
                active: true,
            },
            {
                profile_id: userProfile._id,
                firstname: 'Normal',
                lastname: 'User',
                mail: 'user@example.com',
                password: await hashPassword('123456'),
                locale: 'fr',
                active: true,
            },
            {
                profile_id: userProfile._id,
                mail: 'googleuser@example.com',
                oauth_provider: 'google',
                oauth_id: 'GOOGLE_OAUTH_ID',
                locale: 'fr',
                active: true,
            },
            {
                profile_id: userProfile._id,
                mail: 'microsoftuser@example.com',
                oauth_provider: 'microsoft',
                oauth_id: 'MICROSOFT_OAUTH_ID',
                locale: 'en',
                active: true,
            },
            {
                profile_id: userProfile._id,
                firstname: 'Facebook',
                lastname: 'User',
                mail: 'fbuser@example.com',
                oauth_provider: 'facebook',
                oauth_id: 'FACEBOOK_OAUTH_ID',
                locale: 'en',
                active: true,
            },
        ];

        // Pour chaque compte, on vérifie s'il existe déjà
        for (const account of accounts) {
            const existingAccount = await Account.findOne({ mail: account.mail });
            if (!existingAccount) {
                // Insère le compte uniquement s'il n'existe pas déjà
                await Account.create(account);
                console.log(`Account for ${account.mail} created successfully`);
            } else {
                console.log(`Account for ${account.mail} already exists`);
            }
        }
    } catch (error) {
        console.error('Error populating accounts:', error);
    }
}
async function initializeDatabase() {
    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
        // Crée les profils par défaut
        await Profile.insertMany([
            { label: 'Administrator' },
            { label: 'Normal' },
        ]);
        console.log('Default profiles created');

    }

    await populateAccounts();
}

export default async function connectToDatabase() {
    try {
        await initializeDatabase();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
