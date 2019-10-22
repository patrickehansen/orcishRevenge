module.exports = {
  method: 'GET',
  path: '/helloworld',
  handler: (req, h) => {
      return 'hello world!';
  },
  config: {
    auth: false
  }
}
