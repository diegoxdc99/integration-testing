var express = require('express');
var router = express.Router();
const contactsController = require('../controller/contacts')
const auth = require('express-jwt')
const guard = require('express-jwt-permissions')()

const config = require('../config/config')

router.get('/', auth(config.auth), contactsController.getContacts);
router.get('/:id', auth(config.auth), guard.check(['contact:read']), contactsController.getContact);

module.exports = router;
