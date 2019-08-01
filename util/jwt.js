'use strict'

const jwt = require('jsonwebtoken')

const sign = (payload, secret, callback) => {
  jwt.sign(payload, secret, callback);
}

// const verify = (token, secret) => {
//   jwt.verify(token, secret, callback)
// }

module.exports = {
  sign
  // verify
}