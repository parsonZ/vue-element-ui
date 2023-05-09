const mysql = require("mysql2")

const pool = mysql.createPool({
 host: 'parsonz.rwlb.rds.aliyuncs.com',
 user: 'parzon',
 password: 'admin@123',
 database: 'parsonz_test',
 port: 3306
});
const connection = (sql, params, callback) => {
 pool.getConnection((err,conn) => {
  if(err){
   callback(err,null,null);
  }else{
   conn.query(sql, params, (qerr,vals,fields) => {
    callback(qerr,vals,fields);
    conn.release();
   });
  }
 });
};

module.exports = connection;
