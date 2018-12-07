const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');

const uploadsPath = path.resolve('/root/statics/img/uploads');

const form = new multiparty.Form({
  autoFiles: true,
  uploadDir: uploadsPath,
  maxFieldsSize: 2 * 1024 * 1024
})

module.exports = (req, res) => {
  form.parse(req, function(err, fields, files) {
    if (err) {
      res.send({
        message: '上传出错',
        status: 500
      })
      return;
    }

    if (files.file[0].size > form.maxFieldsSize) {
      res.send({
        message: '文件大小超过200K',
        status: 500
      })

      // 删除文件
      fs.unlink(files.file[0].path, err => {
        console.log(err)
      })
      return;
    }
    
    let path = files.file[0].path;
    let src = path.replace('/root', 'http://www.parsonz.xyz')

    res.send({
      status: 200,
      message: '暂存成功',
      src
    })
  });
}
