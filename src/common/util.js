const crypto = require('crypto')
const storage = window.localStorage;

module.exports = {
  md5Encrypt (encryptString) {
    let hash = crypto.createHash("md5");
    hash.update(encryptString);
    encryptString = hash.digest('hex');
    return encryptString;
  },

  //localstorage
  addStorage(key, value){
    return storage.setItem(key, value);
  },
  removeStorage(key){
    return storage.removeItem(key);
  },
  getStorage(key) {
    return storage.getItem(key)
  },
  //图片上传
  uploadImg(http, data){
    return http.post('/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}