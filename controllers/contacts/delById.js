const { Contact } = require('../../models')

const delById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const deleteContact = await Contact.findByIdAndDelete(contactId)
    if (!deleteContact) {
      return res.status(404).json({
        message: 'Not found',
      })
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Contact deleted',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = delById
