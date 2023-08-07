import chalk from 'chalk';
import {
  existPath,
  pathRelativetoAbsolute,
  validateDirectory,
  getAllFilesDirectory,
  mdFiles,
  getHttpResponse,
  getResultValidateStats,
  getStatsResult,
  analyzeMdFilesArray,
  validateFile,
  pathIsAbsolute,
} from './main.js';

function mdlinks(path, options) {
  return new Promise((resolve, reject) => {
    // console.log(existPath(path), 'jajajajajajajajajajaja');
    const mdFilesArray = [];
    if (existPath(path)) {
      // console.log(pathIsAbsolute(path), 'hol h');
      if (pathIsAbsolute(path)) {
        if (validateFile(path)) {
          if (mdFiles(path)) {
            mdFilesArray.push(path);
          } else {
            console.log(chalk.bold.cyanBright('ERROR: La ruta no tiene archivos .md'));
          }
        }
      } else {
        const pathAbsolute = pathRelativetoAbsolute(path);
        // console.log(pathAbsolute, 'mamamamamamamamamamama');
        if (validateFile(pathAbsolute)) {
          if (mdFiles(path)) {
            mdFilesArray.push(path);
          } else {
            console.log(chalk.bold.cyanBright('ERROR: La ruta no tiene archivos .md'));
          }
        } else if (validateDirectory(pathAbsolute)) {
          // console.log(validateDirectory(pathAbsolute), 'kkkakakakakaka');

          getAllFilesDirectory(pathAbsolute).forEach((file) => {
            // console.log(`Registros: ${getAllFilesDirectory(pathAbsolute)}`);
            if (mdFiles(file)) {
              // console.log(chalk.bold.inverse.yellow('------ El directorio tiene archivos .md ------'));
              mdFilesArray.push(file);

              // console.log(chalk.bold.inverse.blue('------ La ruta es un directorio ------'));
            }
          });
        }
        if (mdFilesArray === []) {
          console.log(chalk.bold.cyanBright('ERROR: La ruta no tiene archivos .md'));
        }

        if (options.validate === true && options.stats === true) {
          analyzeMdFilesArray(mdFilesArray).then((res) => {
          // console.log(res, 'holaaaaaaaaaaaaaaaaaaaaa');
            getHttpResponse(res).then((result) => {
              const resultValidateAndStats = getResultValidateStats(result);
              console.log(resultValidateAndStats);
              resolve(resultValidateAndStats);
            });
          });

        // Este es el proceso para realizar el proceso de Validate
        } else if (options.validate === true && options.stats === false) {
          analyzeMdFilesArray(mdFilesArray).then((result) => {
            getHttpResponse(result).then((res) => {
              const validateLink = res;
              console.log(validateLink);
              resolve(validateLink);
              // console.log(chalk.bgMagenta.bold('------ Validar analisis de resultado ------'));
            });
          });

        // Este es el proceso para realizar el proceso de Stats
        } else if (options.stats === true && options.validate === false) {
        // console.log(analyzeMdFilesArray(mdFilesArray), 'some');
          analyzeMdFilesArray(mdFilesArray).then((result) => {
            const valueStats = getStatsResult(result);
            // console.log(chalk.bgMagenta.bold('------ Validar analisis de resultado ------'));
            console.log(valueStats);
            resolve(valueStats);
          });

        // Acá ingresa cuando no se tienen agregadas las banderas y se pasa unicamente el path
        } else {
          analyzeMdFilesArray(mdFilesArray).then((result) => {
            const noOptions = result;
            resolve(noOptions);
            console.log(
              chalk.bgMagenta.bold(
                '------ Analisis de resultado DOCUMENTO md. -------',
              ),
            );
            console.log(noOptions);
          });
        }
      }
    } else {
    // si no existe se rechaza la promesa
      reject(chalk.bold.red('la ruta no existe'));
    }
  });
}

// mdlinks('./PRUEBA', { validate: true, stats: true });
export default mdlinks;
/* function hola(a,b) {
  return new Promise((resolve, reject) => {
    if(a>b){
      resolve( a+b, 'felicidades')
    }
    else{
      reject(a-b,'lo sentimos mucho :c ')
    }

  })
}

console.log(hola(3,4))
hola(3,4).then((res) =>{
  console.log(res, 'resultado positivo')
}).catch((err) =>
  console.error('Error:', err)
) */
