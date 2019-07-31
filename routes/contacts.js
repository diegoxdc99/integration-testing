var express = require('express');
var router = express.Router();
let contactsController = require('../controller/contacts')

router.get('/', contactsController.getContacts);
router.get('/:id', contactsController.getContact);

module.exports = router;
