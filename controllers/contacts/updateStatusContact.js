const { Contact } = require('../../models')

const updateStatusContact = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: 'missing field favorite',
      })
    }
    const updateContact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      {
        new: true,
      },
    )
    if (!updateContact) {
      return res.status(404).json({
        message: 'Not found',
      })
    }
    return res.json({
      updateContact,
    })
  } catch (error) {
    next(error)
  }
}
// const { error } = validation.updateContactSchema.validate(req.body)

module.exports = updateStatusContact
