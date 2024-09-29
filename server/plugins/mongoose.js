import mongoose from 'mongoose';

export default defineNitroPlugin(async (nuxtApp) => {
    const uri = process.env.NODE_ENV === 'production'
        ? process.env.MONGODB_URI_PROD
        : process.env.MONGODB_URI_DEV;

    // Si une connexion est déjà active, ne pas créer une nouvelle connexion
    if (mongoose.connection.readyState === 1) {
        console.log('Already connected to MongoDB');
        return;
    }

    const clientOptions = {
        serverApi: { version: '1', strict: true, deprecationErrors: true },
        // Configuration du pool de connexions
        maxPoolSize: 10, // Nombre maximum de connexions simultanées dans le pool
        minPoolSize: 2,  // Nombre minimum de connexions
        serverSelectionTimeoutMS: 5000, // Timeout pour la sélection d'un serveur (en millisecondes)
        socketTimeoutMS: 45000, // Timeout pour les sockets inactifs
        family: 4, // Utiliser uniquement IPv4
    };

    try {
        await mongoose.connect(uri, clientOptions);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
});
