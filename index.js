var existPath = require('./main.js');
/*const pathRelativetoAbsolute = require('./main.js')
const validateDirectory = require('./main.js')
const getAllFilesDirectory = require('./main.js')
const existMdFile = require('./main.js')*/

function mdlinks(path, options) {
  return new Promise((resolve, reject) => {
    // ver si la ruta existe
    //let mdFilesArray = [];
    if (existPath(path)){
      console.log('la ruta existe')
            
     /* const pathAbsolute = pathRelativetoAbsolute(path)

          if(validateDirectory(pathAbsolute)){ // valida que el path sea de un directorio
            getAllFilesDirectory(pathAbsolute).forEach(file => { // getAllFilesDirectory obtiene los archivos que hay dentro del directorio
              console.log('Registros: ' + getAllFilesDirectory(pathAbsolute));
              if(existMdFile(file)){ // valida archivo por archivo para saber si es o no .MD
                mdFilesArray.push(file); // En caso de encontrarlo lo almacena en un array
              }else{
                if(mdFilesArray === []){ // Valida que en caso de no encontrar archivos .MD muestre el mensaje informativo
                  console.log(chalk.bgRed.bold('------ ERROR: no existe archivos .md ------'));
                }
              }
            });
          } else {
            // Entra a validar cuando por el path se pasa el archivo .md: node cli.js ./testing/archivo.md --validate --stats
            if(existMdFile(pathAbsolute)){ 
              mdFilesArray.push(pathAbsolute);
            }else{
               // Valida que en caso de no encontrar archivos .MD muestre el mensaje informativo
                console.log(chalk.bgRed.bold('------ ERROR: no existe archivos .md ------'));          
            }
          }
          resolve(mdFilesArray)

      /*async function readAllFiles(pathAbsolute, fileArray = []){
        const files = getFiles(pathAbsolute)
        files.forEach(file => {
          const stat = getFiles(`${pathAbsolute}/${file}`)
          if(stat.isDirectory()){
            readAllFiles(`${pathAbsolute}/${file}`, fileArray)
          }else{
            fileArray.push(`${pathAbsolute}/${file}`)
          }
        }
        )
        return fileArray
      }

      readAllFiles() */

      } else {
      //si no existe se rechaza la promesa
      reject('la ruta no existe');
    }

  });
};

// mdlinks('./oriana/msms/kfj.md');

module.exports = mdlinks;

