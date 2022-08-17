/* eslint-disable */
'use strict'

console.log(process.env.NODE_ENV,'process.env.NODE_ENV')

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/wxpage.cjs.prod.js')
} else {
  module.exports = require('./dist/wxpage.cjs.js')
}
