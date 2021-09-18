const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const getCurrentUser = require('./getCurrentUser')
const updateAvatar = require('./updateAvatar')
const verify = require('./verify')
const resendVerify = require('./resendVerify')

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
  updateAvatar,
  verify,
  resendVerify,
}
