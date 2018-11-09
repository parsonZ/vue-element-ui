'use strict'

  const path = require('path')
  const glob = require('glob')

//根据getEntry获取所有入口主页面
  const pages = getEntry('src/views/*.html');
  //每个入口页面生成一个入口添加到build中
  
  const build = {
        env: require('./prod.env'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: false,
        devtool: '#source-map',
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    };
  for (var pathname in pages) {
    build[pathname] = path.resolve(__dirname, '../dist/' + pathname + '.html')
  }
  module.exports = {
    build: build,
    dev: {
        env: require('./dev.env'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 80, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        devtool: '#source-map',
    }
  }

  //获取所有入口文件
  function getEntry(globPath) {
    var entries = {},
      basename;
    glob.sync(globPath).forEach(function(entry) {
      basename = path.basename(entry, path.extname(entry));
      entries[basename] = entry;
    });
    return entries;
  }

  
