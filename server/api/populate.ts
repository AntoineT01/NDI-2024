import connectToDatabase from '~/server/db';

export default defineEventHandler(async (event) => {
    // Appel à la fonction `connectToDatabase` pour initialiser les comptes et les profils
    await connectToDatabase();
    return { status: 'success', message: 'Database initialized and populated' };
});