const crypto = require('crypto')
const storage = window.localStorage;
const axios = require('axios');
const uploadUrl = 'http://www.parsonz.xyz:9009';

const mixin = {
  created: function () {
    
  },
  methods: {
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
    upload(data){
      return axios.post(uploadUrl+'/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
  }
}

export default mixin
