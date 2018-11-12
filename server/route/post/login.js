const util = require('../../util.js')

module.exports = (req, res) => {
  //参数 req.body
  console.log(req.body)
  let statement = 'SELECT a.*, b.password FROM users a JOIN user_auth b on a.id = b.user_id where a.name = "'+req.body.name+'"'; 
  util.requestHandle({req, res, statement}).then(data => {
    let obj = {}
    if (!data.length) {
        obj = {
            status: 0,
            message: '用户不存在'
        }
    } else {
        if (data[0].password == req.body.password) {
            obj = {
                status: 200
            }
        } else {
            obj = {
                status: 0,
                message: '密码错误'
            }
        }
    }
    res.send(obj)
  })
}