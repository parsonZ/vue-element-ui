const db = require('../mysql.js');
const validator = require('validator');

module.exports = {
  requestHandle(params){
    return new Promise((resolve, reject) => {
      db.query(params.sql, params.sql_param, (error, results, fields) => {
        error ? reject(error) : resolve(results);
      })
    })
  },
  valid: validator,
  getTime(){
    let d = new Date(), year = d.getFullYear(), month = d.getMonth() + 1,
        day = d.getDate() < 10 ? '0'+d.getDate() : d.getDate(),
        hours = d.getHours() < 10 ? '0'+d.getHours() : d.getHours(),
        minutes = d.getMinutes()<10 ? '0'+d.getMinutes() : d.getMinutes(), 
        seconds = d.getSeconds()<10 ? '0'+d.getSeconds() : d.getSeconds();
        return year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds;
  }
}
