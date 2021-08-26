const updateContacts = require('./updateContacts')
const listContacts = require('./listContacts')

const updateContact = async (contactId, updateInfo) => {
  const contacts = await listContacts()
  const updateContactIndex = contacts.findIndex(
    ({ id }) => id + '' === contactId,
  )
  if (updateContactIndex === -1) {
    throw new Error(`Contact with id=${contactId} not found`)
  }
  contacts[updateContactIndex] = {
    ...contacts[updateContactIndex],
    ...updateInfo,
  }

  await updateContacts(contacts)
  return contacts[updateContactIndex]
}

module.exports = updateContact
