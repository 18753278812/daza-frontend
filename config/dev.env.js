var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://localhost:8000"',
  WEB_URL: '"http://localhost:8080"',
  DAOVOICE_APPID: '"cf4049ef"'
})
