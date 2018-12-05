const util = require('../../util.js')

module.exports = (req, res) => {
  req.session.destroy(function(err) {
    if (err) {
      res.send({
        message: '退出失败',
        status: 100
      })
      return;
    } else {
      res.send({
        message: '注销成功',
        status: 200        
      })
    }
  })
}