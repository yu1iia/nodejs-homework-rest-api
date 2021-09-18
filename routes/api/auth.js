const express = require('express')

const { joiUserSchema } = require('../../models/user')
const ctrl = require('../../controllers/auth')
const { validation, authenticate, upload } = require('../../middlewares')

const router = express.Router()

const userValidationMiddleware = validation(joiUserSchema)

router.post('/signup', userValidationMiddleware, ctrl.signup)

router.post('/login', userValidationMiddleware, ctrl.login)

router.get('/logout', authenticate, ctrl.logout)

router.get('/current', authenticate, ctrl.getCurrentUser)

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrl.updateAvatar,
)

router.get('/verify/:verificationToken', ctrl.verify)

router.post('/verify/', ctrl.resendVerify)
module.exports = router
