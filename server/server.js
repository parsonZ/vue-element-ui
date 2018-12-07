const app = require("express")();
const fs = require('fs');
const path = require('path');
const routeGet = path.resolve('./route/get')
const routePost = path.resolve('./route/post')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser")
const fileStore = require('session-file-store')(session);

/**
  post的请求参数处理
**/
app.use(bodyParser.urlencoded({ extended: true }))

/**
 *session处理
**/
app.use(cookieParser('parsonz'));

app.use(session({
  secret: 'parsonz',
  cookie: { maxAge:  60*1000*60 },
  resave: true,
  rolling: true,
  saveUninitialized: true,
  store:new fileStore()
}));

/**
 *跨域请求设置
**/
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin)
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
  res.header('Access-Control-Allow-Credentials', true)
  res.header("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");
  next()
})

/**
 * 请求拦截器
 * 用户端若登录状态过期或未登录则自动抛出错误
**/
app.use((req, res, next) => {
  let originalUrlFind;
  
  ['/get_tags', '/get_user_info'].find(item => {
    if (req.originalUrl.includes(item)){
      originalUrlFind = true
      return true;
    } 
    originalUrlFind = false
  })
  if( originalUrlFind && !req.session.username ){ //登录过期
    res.send({
      status: 401,
      message: '请重新登录'
    })
  }
  next()
})


/**
  *异步自动化接口处理
**/
const interface = async () => {
  await fs.readdir(routeGet, (err, files) => {
    files.map(file => {
      const callback = require(routeGet + '/' + file)
      
      //获取详情
      if( file.includes('get_article_details') ) {
        app.get('/' + file.replace('.js', '') + "/:id", callback)
      } else {
        app.get('/' + file.replace('.js', ''), callback)
      }
    })
  })

  await fs.readdir(routePost, (err, files) => {
    files.map(file => {
      const callback = require(routePost + '/' + file);
      app.post('/' + file.replace('.js', ''), bodyParser.json(), callback)
    })
  })
}

interface().then(res => {
  app.listen(9009, () => console.log('Example app listening on port 9009!'))
})
