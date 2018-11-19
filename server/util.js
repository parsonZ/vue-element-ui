const db = require('../mysql.js');
const validator = require('validator');

module.exports = {
  requestHandle(params){
    console.log(params)
    const promise = new Promise((resolve, reject) => {
      db.execute(params.sql, params.sql_param, (error, results, fields) => {
        if (error) {
            reject(error)
        } else {
            resolve(results)
        }
      })
    })
    .catch(err => {
        console.log(err)
    })
    return promise;
  },
  valid: validator
}