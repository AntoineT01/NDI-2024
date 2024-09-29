export default defineEventHandler((event) => {
    setResponseHeader(event, 'Access-Control-Allow-Origin', '*'); // Remplacez '*' par votre domaine si nécessaire
    setResponseHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    setResponseHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (getMethod(event) === 'OPTIONS') {
        // Pour gérer les requêtes OPTIONS préflight
        event.node.res.statusCode = 204;
        event.node.res.end();
    }
});
