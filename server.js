require('dotenv').config()
const http = require('http')
const path = require('path')

global.$require = (pathname) => require(path.join(__dirname, './' + pathname))

const port = process.argv[2] || process.env.PORT || 80;
const app = $require('app')

http.createServer(app).listen(port, () => {
  console.log(`[Server Start] PORT: ${port}, ENV: ${process.env.NODE_ENV}`)
})