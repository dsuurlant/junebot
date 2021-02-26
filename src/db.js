'use strict';

const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 5
});

async function dbQuery(query, parameters) {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(query, parameters);
        return res;
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
}
