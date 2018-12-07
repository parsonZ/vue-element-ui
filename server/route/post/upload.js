const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');
const uuid = require('node-uuid');

//配置文件上传路径
const uploadsPath = path.resolve('/statics/img/uploads');

const form = new multiparty.Form({
  autoFiles: true,
  maxFieldsSize: 200000 * 1024,
  uploadDir: uploadsPath
});

module.exports = (req, res) => {
  form.parse(req, function(err, fields, files) {
    if (err) {
	   console.log(err)
      res.send({
        message: '格式不正确',
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
    
    res.send({
      status: 200,
      message: '暂存成功',
      src: files.file[0].path
    })
  });
}
