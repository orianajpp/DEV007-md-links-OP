const fs = require('fs');
// const path = require('path');


const existPath = (paths) => fs.existsSync(paths);

/* const pathRelativetoAbsolute = (paths) => path.resolve(paths)
const validateDirectory = (paths) => fs.statSync(paths).isDirectory(); // CUMPLE

// Función para obtener los archivos que están dentro de un directorio y una lista plana de todas las rutas 
function getAllFilesDirectory(path) {
  if (validateDirectory(path)) {
    const files = fs.readdirSync(path); //lee sincronicamente el contenido de un directorio
    return files
      .map((file) => {
        return getAllFilesDirectory(`${path}/${file}`);
      })
      .flat();
  } else {
    return [path];
  }
}

const existMdFile = (paths) => path.extname(paths) === ".md"; */


module.exports = existPath;