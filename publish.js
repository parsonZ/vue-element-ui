const { exec } = require('child_process');

const publish = async () => {
  await exec('git checkout master', (err) => {
    if (!err) {
      return true
    }
  })
  await exec('git pull origin master', err => {
    if (!err) {
      return true
    }
  })
  await console.log('git拉取完成')

  await exec('rm -rf dist', (err, stdout, stderr) => {
    if (!err) {
      return true
    }
  })
  await console.log('remove list完成')

  await exec('rm -rf node_modules', (err, stdout, stderr) => {
    if (!err) {
      return true
    }
  })
  await console.log('remove Modules完成')

  await exec('npm install', (err, stdout, stderr) => {
    if (!err) {
      return true
    }
  })
  await console.log('install完成')

  await exec('npm run build', (err, stdout, stderr) => {
    if (!err) {
      return true
    }
  })
  await console.log('build完成')

  await exec('rm -rf /usr/share/nginx/html/dist')
  await exec('cp -r /root/parsonz/vue-element-ui/dist /usr/share/nginx/html', (err, stdout, stderr) => {
    if (!err) {
      return true
    }
  })

  await console.log(`nginx重启...等待中...`)
  await exec('systemctl restart nginx')

  return {
    code: 200
  }
}

publish()
