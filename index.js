'use strict'

const login = require('./login.js')
const p1Validate = require('./protocol1.js')
const p23Validate = require('./protocol23.js')
const samlValidate = require('./protocolSaml.js')
const logout = require('./logout.js')

const debug = require('debug')('loopback:component:cas')

module.exports = function (loopbackApplication, options) {

  /* Default to User model */
  if (!options.userModel || options.userModel == '') {
    options.userModel = "User"
  }

  loopbackApplication.all('/cas/login', function(req, res, next) {
  debug('/cas/login')
  login(loopbackApplication, options, req, res, next)
  })

  loopbackApplication.get('/cas/logout', function(req, res, next) {
  debug('/cas/logout')
  logout(loopbackApplication, options, req, res, next)
  })

  loopbackApplication.get('/cas/validate', function(req, res, next) {
    debug('/cas/validate')
    p1Validate(loopbackApplication, options, req, res, next)
  })

  loopbackApplication.get('/cas/serviceValidate', function(req, res, next) {
    debug('/cas/serviceValidate')
    p23Validate(loopbackApplication, options, req, res, next, false)
  })

  loopbackApplication.get('/cas/p3/serviceValidate', function(req, res, next) {
    debug('/cas/p3/serviceValidate')
    p23Validate(loopbackApplication, options, req, res, next, true)
  })

  loopbackApplication.post('/cas/samlValidate', function(req, res, next) {
    debug('/cas/samlValidate')
    samlValidate(loopbackApplication, options, req, res, next)
  })

}
