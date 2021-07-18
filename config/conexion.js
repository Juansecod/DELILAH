const Sequelize = require('sequelize');
// Se configura dotenv para tomar los datos del entorno de trabajo
require('dotenv').config({ path: '../config/.env' });
if (!process.env.HOST) require('dotenv').config({ path: './config/.env' });
const DB_USER = process.env.USER;
const DB_PASSWORD = process.env.PASSWORD;
const DB_HOST = process.env.HOST;
const DB_PORT = process.env.PORT;
const DB = process.env.DB;
const path = `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB}`;

console.log(path);
const sequelize = new Sequelize(path, {
    dialect: 'mysql',
    operatorsAliases: 0 ,
    logging: false,
});

sequelize.authenticate()
    .then(() => {
        console.log('Conectado.');
    }).catch(err => {
        console.error('Error de conexion: ', err);
    });

module.exports = sequelize;