#!/bin/bash
cd /root/parsonz/vue-element-ui

# git拉取
echo "正在同步master代码..."
git checkout .;
git checkout master;
git pull origin master;
echo "🎉  代码同步完成"

echo "移除dist..."
rm -rf dist
echo "🎉  dist移除完成"

# 删除依赖
echo "移除依赖中..."
rm -rf node_modules
echo "🎉  依赖移除完成"

# 重新安装依赖
echo "安装依赖中..."
npm install
echo "🎉  安装移除完成"

# 执行npm打包
echo "正在执行NPM打包..."
npm run build
echo "🎉  NPM打包完成"

# 执行部署
rm -rf /usr/share/nginx/html/dist;
cp -r dist /usr/share/nginx/html

# 重启node服务
esPort=9009
pid=$(netstat -nlp|grep :$esPort|awk '{print $7}'|awk -F"/" '{ print $1 }');

#杀掉对应的进程，如果pid不存在，则不执行
if [  -n  "$pid"  ];  then
    forever stop $pid;
fi
echo "关闭node服务..."

echo "重启nginx和node服务"
systemctl restart nginx

cd server/
forever start server.js
echo "node服务启动成功!"

