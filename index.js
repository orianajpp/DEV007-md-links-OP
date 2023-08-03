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
} from './main.js';

function mdlinks(path, options) {
  return new Promise((resolve, reject) => {
    // ver si la ruta existe
    const mdFilesArray = [];
    if (existPath(path)) {
      console.log(
        chalk.bold.inverse.green('------------La ruta existe-----------------'),
      );

      const pathAbsolute = pathRelativetoAbsolute(path);
      console.log('hola', validateFile(pathAbsolute));

      if (validateFile(pathAbsolute)) {
        console.log(chalk.bold.inverse.yellow('------ La ruta es un archivo------'));
        if (mdFiles(pathAbsolute)) {
          mdFilesArray.push(pathAbsolute);
        } else {
          console.log(chalk.bold.inverse.red('------ ERROR: La ruta no es un archivo .md ------'));
        }
      }
      /* else { */
      // console.log(validateDirectory(pathAbsolute))
      if (validateDirectory(pathAbsolute)) {
        console.log(chalk.bold.inverse.blue('------ La ruta es un directorio ------'));
        getAllFilesDirectory(pathAbsolute).forEach((file) => {
          console.log(`Registros: ${getAllFilesDirectory(pathAbsolute)}`);
          if (mdFiles(file)) {
            console.log(chalk.bold.inverse.yellow('------ El directorio tiene archivos .md ------'));
            mdFilesArray.push(file);
          } else {
            // console.log(mdFilesArray)
            console.log(chalk.red('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'));
          }
        });
        if (mdFilesArray === []) {
          console.log(chalk.bold.inverse.red('------ ERROR: no se encontró archivos .md ------'));
        }
      } else if (mdFiles(pathAbsolute)) {
        mdFilesArray.push(pathAbsolute);
      } else {
        console.log(
          chalk.bold.inverse.red(
            '------ ERROR: no existe archivos .md ------',
          ),
        );
      }
      console.log(mdFilesArray, 'ppppppppppppppppppppppppp');
      // console.log(mdFilesArray);
      // console.log(options.validate, 'jjajajajajaja');

      if (options.validate === true && options.stats === true) {
        analyzeMdFilesArray(mdFilesArray).then((res) => {
          // console.log(res, 'holaaaaaaaaaaaaaaaaaaaaa');
          getHttpResponse(res).then((result) => {
            const resultValidateAndStats = getResultValidateStats(result);
            console.log(chalk.bgMagenta.bold('------ Validación de análisis de resultados y estadísticas ------'));
            console.log(resultValidateAndStats);
            resolve(resultValidateAndStats);
          });
        });

        // Este es el proceso para realizar el proceso de Validate
      } else if (options.validate === true && options.stats === false) {
        analyzeMdFilesArray(mdFilesArray).then((result) => {
          getHttpResponse(result).then((res) => {
            const validateLink = res;
            resolve(validateLink);
            console.log(
              chalk.bgMagenta.bold(
                '------ Validar analisis de resultado ------',
              ),
            );
            console.log(validateLink);
          });
        });

        // Este es el proceso para realizar el proceso de Stats
      } else if (options.stats === true && options.validate === false) {
        console.log(analyzeMdFilesArray(mdFilesArray), 'some');
        analyzeMdFilesArray(mdFilesArray).then((result) => {
          const valueStats = getStatsResult(result);
          console.log(
            chalk.bgMagenta.bold('------ Validar analisis de resultado ------'),
          );
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
    } else {
      // si no existe se rechaza la promesa
      reject(chalk.bold.inverse.red('la ruta no existe jajajajaja'));
    }
  });
}

mdlinks('./PR', { validate: false, stats: true });
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
