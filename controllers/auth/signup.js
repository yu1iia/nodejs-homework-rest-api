const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { v4 } = require('uuid')

require('dotenv').config()
const { sendMail } = require('../../utils')
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
  const verificationToken = v4()
  const data = {
    to: email,
    subject: 'Registration confirmation',
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Please confirm your registration</a>`,
  }

  await sendMail(data)

  await User.create({
    email,
    password: hashPassword,
    avatarURL: gravatar.url(email),
    verificationToken,
  })

  return res.status(201).json({
    status: 'Created',
    email,
    subscription: 'starter',
    message: 'Successful registration',
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Please confirm your registration</a>`,
  })
}
module.exports = signup
