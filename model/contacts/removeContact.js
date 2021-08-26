const updateContacts = require('./updateContacts')
const listContacts = require('./listContacts')

const removeContact = async contactId => {
  const contacts = await listContacts()
  const removeContactIndex = contacts.findIndex(item => item.id === contactId)
  if (removeContactIndex === -1) {
    throw new Error(`Contact with id=${contactId} not found`)
  }
  const newContacts = contacts.filter(item => item.id !== contactId)
  await updateContacts(newContacts)
  return contacts[removeContactIndex]
}

module.exports = removeContact
