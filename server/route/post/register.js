const util = require('../../util.js')

module.exports = (req, res) => {
  let sql = 'SELECT * from user where username = ?';
  let sql_param = [req.body.name];
  let obj = {}
  util.requestHandle({sql, sql_param}).then(data => {
    if (data.length) {
      obj = {
        status: 500,
        message: '用户已存在'
      }
    } else if (!util.valid.isEmail(req.body.email)){
      obj = {
        status: 500
        message: '邮箱格式不正确'
      }
    } else if (!util.valid.equals(req.body.password, req.body.password_confirm)){
      obj = {
        status: 500,
        message: '两次密码不一致'
      }
    } else {
      //插入数据
      let addUser = "INSERT INTO `test`.`user` (`username`, `email`, `password`, `create_time`, `identity_type`) VALUES (?,?,?,?,?);";
      let addUser_param = [req.body.name, req.body.email, req.body.password,util.getTime(), 1];
      util.requestHandle({sql: addUser, sql_param: addUser_param}).then(data => {
        res.send({
          status: 200,
          message: '注册成功'
        })
        return false;
      })
    }
    res.send(obj)
  }).catch(err => {
    return false
  })
}