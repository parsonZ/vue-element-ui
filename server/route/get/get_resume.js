const util = require('../../util.js')

module.exports = (req, res) => {
  let sql = 'SELECT a.*, b.password FROM users a JOIN user_auth b on a.id = b.user_id where a.name = ?';
  util.requestHandle({sql, sql_param: []}).then(data => {
    console.log(data)
  })
}