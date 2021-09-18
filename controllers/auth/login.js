const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../../models')
require('dotenv').config()

const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(401).json({
      Status: 'Unauthorized',
      message: 'Email or password is wrong',
    })
  }
  if (!user.verify) {
    return res.status(404).json({
      Status: 'Not found',
      message: 'User not found',
    })
  }
  const hashPassword = user.password
  const compareResult = bcrypt.compareSync(password, hashPassword)
  if (!compareResult) {
    return res.status(401).json({
      Status: 'Unauthorized',
      message: 'Email or password is wrong',
    })
  }
  const payload = {
    id: user._id,
  }

  const { SECRET_KEY } = process.env

  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(user._id, { token })
  return res.json({
    token,
    user: {
      email,
      subscription: 'starter',
    },
  })
}

module.exports = login
