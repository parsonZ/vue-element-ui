const app = require("express")();
const fs = require('fs');
const path = require('path');
const routeGet = path.resolve('./route/get')
const routePost = path.resolve('./route/post')
const sql = require('../mysql.js')
const bodyParser = require("body-parser")

fs.readdir(routeGet, (err, files) => {
  files.map(file => {
    const callback = require(routeGet + '\\' + file)
    app.get('/' + file.replace('.js', ''), callback)
  })
})

fs.readdir(routePost, (err, files) => {
  files.map(file => {
    const callback = require(routePost + '\\' + file);
    app.post('/' + file.replace('.js', ''), bodyParser.json(), callback)
  })
})

//设置跨域
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
  res.header("Content-Type", "application/json;charset=utf-8")
  res.header("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");
  next()
})

//中间件处理
app.use((req, res, next) => {
  req['sql'] = sql;
  next();
})

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(9009, () => console.log('Example app listening on port 9009!'))