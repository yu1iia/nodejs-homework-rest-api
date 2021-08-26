const contactsOperations = require('../../model/contacts')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await contactsOperations.getContactById(contactId)
    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found',
      })
    }
    res.json({
      contact,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getById
