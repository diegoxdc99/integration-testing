'use strict'

/*
  -se debe de configurar el ava para escoger la carpeta o carpetas que tienen archivos para pruebas
   la configuracion se puede hacer en el package.json
  -Se pueden hacer informes de coverage usando nyc y ejecutando el comando npm run coverage
  -Se puede exportar el reporte de covertura usando npm run coverageHTML genera una carpeta llamada 'coverag' con el html
  -Se deben excluir las carpetas .nyc_output y coverage
*/

const test = require('ava')  //Gestiona, ejecuta y valida los test
const request = require('supertest') //para hacer peticiones a la api
const fixtures = require('./fixtures/contact') // Datos quemados de prueba
const sinon = require('sinon'); //Falsifica el funcionamiento de las funciones
const proxyquire = require('proxyquire') //inyecta modulos falsos con las funciones falsas

let sandbox = null // sandbox que contiene las funciones falsas
let server = null //instancia del servidor
let contactsRepo = {} //mockeo de la base de datos

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()  //se crea un sandbox

   //Se modifica el modulo del repositorio de contactos
   //Se mockea la funcion getAllUser
  contactsRepo.getAllUser = sandbox.stub()
  contactsRepo.getAllUser.returns(Promise.resolve(fixtures.all)) //sin parametros siempre retorna una promesa con datos quemados

  //Se mockea la funcion getUser
  contactsRepo.getUser = sandbox.stub()
  contactsRepo.getUser.withArgs(fixtures.single.name).returns(Promise.resolve(fixtures.single)); // con argumentos retorna una promesa con datos quemados
  contactsRepo.getUser.withArgs(fixtures.contactNotFound.name).returns(Promise.resolve(null));
  contactsRepo.getUser.withArgs(fixtures.contactError.name).throws(new Error('unkwnonw error')); //con argumentos arroja un error
  contactsRepo.getUser.throws(new Error('Contact not found')); //en caso de no cumplir con las reglas anteriores arroja un error

  const contactService = proxyquire('../services/contacts', { //sirve para inyectar el mock del modulo
    '../repository/contacts': contactsRepo
  })

  const contactController = proxyquire('../controller/contacts', { //se va inyectando los modulos segun el orden en el que sean llamados hasta el servidor
    '../services/contacts': contactService
  })

  const routes = proxyquire('../routes/contacts', {
    '../controller/contacts': contactController
  })

  server = proxyquire('../app', {
    './routes/contacts': routes
  })

});

test.afterEach(async => {
  sandbox && sinon.restore() //despues de cada prueba resetea el sandbox para simular un ambiente nuevo
})

// test.skip('/contacts', t => {
/*
  serial: ejecuta las pruebas de forma serial (en orden una por una)
  cb: supertest es con callbacks, cb permite terminar la prueba usando callbacks
*/
test.serial.cb('/contacts get all contacts', t => {
  request(server)
    .get('/contacts') //ruta y metodo
    .expect(200) //status esperado
    .expect('Content-Type', /json/) //tipo de respuesta esperada que contenga json
    .end((err, res) => {
      t.falsy(err, 'should not return an error')  //validar que no haya errores
      let body = res.body
      t.deepEqual(body, [
        {
          "name": "Carlos",
          "Number": "12345"
        },
        {
          "name": "Alberto",
          "Number": "1111"
        }
      ], 'response body should be the expected') // se valida que la respuesta sea igual a la esperada
      t.end()
    })
})

test.serial.cb('/contacts get all contacts throw BD error', t => {
  request(server)
    .get('/contacts')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      let body = res.body
      t.deepEqual(body, [
        {
          "name": "Carlos",
          "Number": "12345"
        },
        {
          "name": "Alberto",
          "Number": "1111"
        }
      ], 'response body should be the expected')
      t.end()
    })
})

test.serial.cb('/contacts/:id get a contact with id', t => {
  request(server)
    .get('/contacts/'+fixtures.single.name)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      let body = res.body
      t.deepEqual(body, fixtures.single, 'response body should be the expected')
      t.end()
    })
})

test.serial.cb('/contacts/:id - contact not found', t => {
  request(server)
    .get('/contacts/'+fixtures.contactNotFound.name)
    .expect(404)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      let body = res.body
      t.deepEqual(body, {"error": "Contact not found"}, 'response body should be the expected')
      t.end()
    })
})

test.serial.cb('/contacts/:id - db throw error', t => {
  request(server)
    .get('/contacts/'+fixtures.contactError.name)
    .expect(500)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      let body = res.body
      t.deepEqual(body, {"error": "unkwnonw error"}, 'response body should be the expected')
      t.end()
    })
})