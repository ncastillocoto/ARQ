const sql = require("mssql");
require("dotenv").config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        enableArithAbort: true,
    },
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log("🟢 Conectado a Azure SQL");
        return pool;
    })
    .catch(err => console.log("🔴 Error al conectar:", err));

module.exports = {
    sql, poolPromise
};