const {extendAll} = require('./object')
const {map} = require('./list')

var groups = map(name => require('./' + name))([
  'combinators',
  'logic',
  'arithmatic',
  'list',
  'object',
  'core'
])

module.exports = extendAll(groups)
