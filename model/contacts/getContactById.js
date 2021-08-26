const listContacts = require('./listContacts')

const getContactById = async contactId => {
  const contacts = await listContacts()
  const requestContact = contacts.find(({ id }) => id + '' === contactId)
  if (!requestContact) {
    return null
  }
  return requestContact
}
module.exports = getContactById
