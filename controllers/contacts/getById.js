const { Contact } = require('../../models')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await Contact.findById(contactId)
    if (contactId.match(/^[0-9a-fA-F]{24}$/)) {
      console.log(contact)
    }
    console.log(contact)
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
