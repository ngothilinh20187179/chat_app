import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 5000,
    mongoURI: process.env.MONGODB_ATLAS_URI,
    jwtSecret: process.env.JWT_SECRET,
    nodeEnv: process.env.NODE_ENV || 'development',
    tokenExpiration: process.env.TOKEN_EXPIRATION || '1d',

    validate: () => {
        if (!config.mongoURI) {
            throw new Error('MONGODB_ATLAS_URI is not defined in environment variables');
        }
        if (!config.jwtSecret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
    }
};
config.validate();