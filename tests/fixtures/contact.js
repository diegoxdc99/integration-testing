'use strict'

const contacts =  [
  {
    "name": "Carlos",
    "Number": "12345"
  },
  {
    "name": "Alberto",
    "Number": "1111"
  }
]

const single = {
  "name": "Alberto",
  "Number": "1111"
}

const contactNotFound = {
  "name": "XXXXX",
  "Number": "00000"
}

const contactError = {
  "name": "YYYYY",
  "Number": "00000"
}

module.exports = {
  all: contacts,
  single,
  contactNotFound,
  contactError
}