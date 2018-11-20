const mysql = require("mysql2")

const pool = mysql.createPool({
  host: 'parsonz.xyz',
  user: 'root',
  database: 'test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool