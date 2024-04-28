const Sequelize = require('sequelize');
const path = require('path');
const AppError = require('@/utils/error');

let sequelize;

if (process.env.NODE_ENV === 'test') {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '../../test/db/test.sqlite'),
    });
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
        },
    );
}

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
