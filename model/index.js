const fs = require('fs/promises')
const path = require('path')
const { v4: getId } = require('uuid')

const contactsPath = path.join(__dirname, 'contacts.json')

async function readData() {
  const data = await fs.readFile(contactsPath)
  const result = JSON.parse(data)
  return result
}

async function listContacts() {
  try {
    return await readData()
  } catch (error) {
    console.log(error.message)
  }
}

async function getContactById(contactId) {
  try {
    const result = await readData()
    const contact = result.find(item => item.id === contactId)
    if (!contact) {
      return null
    }
    return contact
  } catch (error) {
    console.log(error.message)
  }
}

async function removeContact(contactId) {
  try {
    const result = await readData()
    const idx = result.findIndex(item => item.id === contactId)
    if (idx === -1) {
      return null
    }
    const contact = result[idx]
    const contacts = result.filter(item => item.id !== contactId)
    const newContacts = JSON.stringify(contacts)
    await fs.writeFile(contactsPath, newContacts)
    return contact
  } catch (error) {
    console.log(error.message)
  }
}

async function addContact(body) {
  const contactNew = {
    id: getId(),
    name: body.name,
    email: body.email,
    phone: body.phone
  }
  try {
    const data = await readData()
    const contactsListNew = [contactNew, ...data]

    await fs.writeFile(
      contactsPath,
      JSON.stringify(contactsListNew, null, '\t'),
    )
    return contactNew
  } catch (error) {
    console.error(error.message)
  }
}

async function updateContact(contactId, body) {
  try {
    const data = await readData()
    const idx = data.findIndex(elem => elem.id === contactId)
    if (idx === -1) {
      return null
    }
    data[idx] = { ...data[idx], ...body }
    const newContacts = JSON.stringify(data)
    await fs.writeFile(contactsPath, newContacts)
    return data[idx]
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
