export default () => ({
    envFilePath: ['.env', '.env.production', '.env.development'],
    isGlobal: true,
    port: Number(process.env.APP_POST),
    database: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
});
