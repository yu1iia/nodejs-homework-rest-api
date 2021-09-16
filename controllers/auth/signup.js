const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { User } = require('../../models')

const signup = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    return res.status(409).json({
      Status: 'Conflict',
      message: 'Email in use',
    })
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  await User.create({
    email,
    password: hashPassword,
    avatarURL: gravatar.url(email),
  })
  return res.status(201).json({
    status: 'Created',
    email,
    subscription: 'starter',
  })
}
module.exports = signup
