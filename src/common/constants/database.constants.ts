export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_PORT = parseInt(process.env.DATABASE_PORT, 10);
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_SYNCHRONIZE = process.env.DATABASE_SYNCHRONIZE === 'true';
export const DATABASE_LOGGING = process.env.DATABASE_LOGGING === 'true';

export const DATABASE_ENTITIES = [];

export const DATABASE_MIGRATIONS = [];

export const DATABASE_SEEDS = [];
