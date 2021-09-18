const { sendMail } = require('../../utils')
const { User } = require('../../models')

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body

  try {
    const { verificationToken } = await User.findOne({ email })

    if (!verificationToken) {
      res.status(400).json({
        status: 'Bad Request',
        code: 400,
        message: 'Verification has already been passed',
      })
    }

    const data = {
      to: email,
      subject: 'Registration confirmation',
      html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Let's verify your email so you can start to use your phonebook</a>`,
    }

    sendMail(data)
    res.json({
      status: 'Ok',
      code: 200,
      message: 'Verification email sent',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = resendVerifyEmail
