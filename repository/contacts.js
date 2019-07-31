let allContacts = [
  {
    "name": "Diego",
    "Number": "12345"
  },
  {
    "name": "Albertos",
    "Number": "1111"
  },
  {
    "name": "Meneses",
    "Number": "22222"
  }
]

const getAllUser = async () => {
  console.log('==========> soy el repositorio!!!!!!') // no se debería de mostrar en las pruebas
  return allContacts;
}

const getUser = async (id) => {
  console.log('==========> soy el repositorio!!!!!!') // no se debería de mostrar en las pruebas
  let users = await getAllUser();
  let user = users.find(user => user.name == id);
  return user
}



module.exports = {
  getAllUser,
  getUser
}