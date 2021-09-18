const { Schema, model } = require('mongoose')
const { v4 } = require('uuid')
const Joi = require('joi')

const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },

    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'verificationToken token is required'],
    },
    avatarURL: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
)

userSchema.methods.createVerifyToken = function () {
  this.verifyToken = v4()
}

const joiUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),

  password: Joi.string().min(6).required(),
})

const User = model('user', userSchema)

module.exports = { User, joiUserSchema }
