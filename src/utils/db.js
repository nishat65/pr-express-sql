const Sequelize = require('sequelize');
const AppError = require('@/utils/error');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    },
);

exports.db = sequelize;

exports.connectDB = async function getDb() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        const appError = new AppError(500, error);
        console.log(appError, 'error');
        process.exit(1);
    }
};
