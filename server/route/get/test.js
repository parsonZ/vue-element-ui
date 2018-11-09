const util = require('../../util.js')

module.exports = (req, res) => {
  let statement = 'select * from users'
  util.requestHandle({req, res, statement}).then(res => {
    console.log(res)
  })
  
  req.sql.end()
}