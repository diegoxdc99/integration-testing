
# Integration-testing

La idea de este repositorio es practicar la implementación de pruebas unitarias y tener un ejemplo con comentarios para entender qué es lo que se está haciendo y para qué sirve.

**Nota:** Estas pruebas fueron hechas empíricamente por lo que quizás no tenga en cuenta las mejores prácticas sin embargo intenté hacerlas acorde a los tutoriales.

### Scripts de NPM
- **start:** Inicia el servidor en modo de desarrollo
- **test:** Ejecuta las pruebas usando ava
- **coverage:** crea un informe de cobertura de pruebas por consola
- **coverageHTML:** crea un informe de cobertura de pruebas en HTML en la carpeta coverage

### Cobertura

[![Informe de cobertura](https://github.com/diegoxdc99/integration-testing/blob/master/Coverage.JPG?raw=true "Informe de cobertura")](https://github.com/diegoxdc99/integration-testing/blob/master/Coverage.JPG?raw=true "Informe de cobertura")

### Consideraciones

- Para el informe de cobertura se excluyeron los archivos de los repositorios, pues estos son posteriormente mockeados y su código no es ejecutado.

Espero le sirva a alguien :)
