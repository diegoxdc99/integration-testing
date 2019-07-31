const contactsRepository = require('../repository/contacts')

const getContacts = async () => {
  return await contactsRepository.getAllUser();
}

const getContact = async (id) => {
  return await contactsRepository.getUser(id);
}

module.exports = {
  getContacts,
  getContact
}