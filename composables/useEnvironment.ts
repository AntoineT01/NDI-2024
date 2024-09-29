export const useEnvironment = () => {
    const isProd = process.env.NODE_ENV === 'production';
    const isDev = process.env.NODE_ENV === 'development';
    const isTest = process.env.NODE_ENV === 'test';

    return { isProd, isDev, isTest };
};
