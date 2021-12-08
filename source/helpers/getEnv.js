export const getEnv = (name) => {
    const env = process.env;

    if (!env[ name ]) {
        throw new Error('Environment variable undefined');
    }

    return env[ name ];
};
