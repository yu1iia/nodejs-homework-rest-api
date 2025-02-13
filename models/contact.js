const { Schema, model, SchemaTypes } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
)

const joiContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),

  phone: Joi.string()
    .pattern(RegExp('^[(][0-9]{3,3}[)][ ][0-9]{3,3}[-][0-9]{4,4}$'))
    .required(),
  favorite: Joi.boolean(),
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiContactSchema,
}
