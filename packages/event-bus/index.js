'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/event-bus.cjs.prod.js')
} else {
  module.exports = require('./dist/event-bus.cjs.js')
}
