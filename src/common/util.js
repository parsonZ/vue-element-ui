const crypto = require('crypto')

module.exports = {
  md5Encrypt (encryptString) {
    let hash = crypto.createHash("md5");
    hash.update(encryptString);
    encryptString = hash.digest('hex');
    return encryptString;
  }
}