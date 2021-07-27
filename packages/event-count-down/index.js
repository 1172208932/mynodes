'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/event-count-down.cjs.prod.js')
} else {
  module.exports = require('./dist/event-count-down.cjs.js')
}
