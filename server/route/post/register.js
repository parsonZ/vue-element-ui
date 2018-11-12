const util = require('../../util.js')

module.exports = (req, res) => {
  console.log(req.body)
  let statement = 'SELECT a.*, b.password FROM users a JOIN user_auth b on a.id = b.user_id where a.name = "'+req.body.name+'"'; 
  util.requestHandle({req, res, statement}).then(data => {
    console.log('=======')
    console.log(data)
    let obj = {}
    // if (data.length) {
    //   obj = {
    //     status: 0,
    //     message: '用户已存在'
    //   }
    // } else if (!req.body.email.includes('@')){
    //   obj = {
    //     status: 0,
    //     message: '邮箱格式不正确'
    //   }
    // } else if (req.body.password !== req.body.password_confirm){
    //   obj = {
    //     status: 0,
    //     message: '两次密码不一致'
    //   }
    // } else {
    //   //插入数据
    //   // let state1 = "INSERT INTO users (`name`, `identity_type`) VALUES ('"+req.body.name+"', '1')";
    //   // util.requestHandle({req, res, state1}).then(data => {
    //   //   console.log('das')
    //   // })
      
    // }
    

    res.send(obj)
  })

  let state1 = 'SELECT a.*, b.password FROM users a JOIN user_auth b on a.id = b.user_id where a.name = "'+req.body.name+'"';
      util.requestHandle({req, res, state1}).then(data => {
        console.log('------------')
        console.log(data)
      })
}