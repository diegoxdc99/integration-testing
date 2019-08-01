'use strict'

let contactsService = require('../services/contacts');

const getContacts = async (req, res, next) => {
  let contacts;
  try{
    contacts = await contactsService.getContacts();
  }
  catch(e) {
    return next(e); // controlar la excepción desconocida
  }

  res.send(contacts);
}


const getContact = async (req, res, next) => {
  let contact;
  let { user } = req;
  if (!user || !user.username) {
    return next(new Error('Not authorized'))
  }

  try {
    contact = await contactsService.getContact(req.params.id);
  }
  catch(e) {
    return next (e);
  }

  if(!contact) {
    return next(new Error('Contact not found')); // deja que el middleware de express controle el error
  }
  res.send(contact);
}

module.exports = {
  getContacts,
  getContact
}