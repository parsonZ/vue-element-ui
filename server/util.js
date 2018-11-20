const db = require('../mysql.js');
const validator = require('validator');

module.exports = {
  requestHandle(params){
    return new Promise((resolve, reject) => {
      db.query(params.sql, params.sql_param, (error, results, fields) => {
        error ? reject(error) : resolve(results);
      })
    })
    .catch(err => {
        console.log(err)
    })
  },
  valid: validator
}