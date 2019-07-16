module.exports = {
  method: 'GET',
  path: '/bundle.js',
  handler: {
    file: 'bundle.js'
  },
  config: {
    auth: false
  }
}