import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'BSSMbafm@22',
    database: 'user',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
