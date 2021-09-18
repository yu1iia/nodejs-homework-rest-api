const { User } = require('../../models')

const verify = async (req, res) => {
  const { verificationToken } = req.params
  const user = await User.findOne({ verificationToken })
  if (!user) {
    return res.status(404).json({
      Status: 'Not found',
      message: 'User not found',
    })
  }
  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  })
  res.send('<h2>Verification successful</h2>')
}

module.exports = verify
