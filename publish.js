const { exec } = require('child_process');

const publish = async () => {
  console.log(`remove dist...等待中...`)
  await exec('rm -rf dist', (err, stdout, stderr) => {
    if (!err) {
      return true
    }
  })

  console.log(`remove node_modules...等待中...`)
  await exec('rm -rf node_modules', (err, stdout, stderr) => {
    if (!err) {
      return true
    }
  })

  console.log(`npm install...等待中...`)
  await exec('npm install', (err, stdout, stderr) => {
    if (!err) {
      return true
    }
  })
  
  console.log(`npm build...等待中...`)
  await exec('npm run build', (err, stdout, stderr) => {
    if (!err) {
      return true
    }
  })
  
  console.log(`copy dist...等待中...`)
  await exec('rm -rf /usr/share/nginx/html/dist')
  await exec('cp -r /root/parsonz/vue-element-ui/dist /usr/share/nginx/html', (err, stdout, stderr) => {
    if (!err) {
      return true
    }
  })
  
  console.log(`nginx重启...等待中...`)
  await exec('systemctl restart nginx')

  return {
    code: 200
  }
}

publish()
