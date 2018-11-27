const mysql = require("mysql2")

const connection = mysql.createConnection({
  host: 'parsonz.xyz',
  user: 'root',
  password: 'pang800820zong',
  database: 'test',
  multipleStatements: true
});

connection.connect((err) => {
  if(err) {
    console.log(err)
    return;
  }
  console.log('mysql connection')

})

// const pool = mysql.createPool({
//   host: 'parsonz.xyz',
//   user: 'root',
//   database: 'test',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

module.exports = connection