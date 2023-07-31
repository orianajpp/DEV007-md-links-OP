import { existsSync, statSync, readdirSync, readFile } from 'fs';
import { extname, resolve } from 'path';
import axios from 'axios';
import chalk from 'chalk';

export const existPath = (paths) => existsSync(paths);
export const pathRelativetoAbsolute = (paths) => resolve(paths);

export const validateFile = (paths) => statSync(paths).isFile();
export const validateDirectory = (paths) => statSync(paths).isDirectory();

//--------------------------- funcion que recorre toda la ruta ----------------------------------------

export function getAllFilesDirectory(path) {
  if (validateDirectory(path)) {
    const files = readdirSync(path);
    return files
      .map((file) => {
        return getAllFilesDirectory(`${path}/${file}`);
      })
      .flat();
  } else {
    return [path];
  }
}

//--------------------------- funcion que detecta archivos md ----------------------------------------

export const mdFiles = (paths) => extname(paths) === '.md';

//-------------------constantes que guardan los regex para buscar buscar links, url y text -------------

const linksRx = /\[(.+?)\]\((https?:\/\/[^\s]+)(?: '(.+)')?\)|(https?:\/\/[^\s]+)/gi;
const urlRx = /\((https?:\/\/[^\s]+)(?: '(.+)')?\)|(https?:\/\/[^\s]+)/gi;
const textRx = /\[(\w+.+?)\]/gi;

//------------------------Función que permite obtener los links del documento MD-----------------------

export const getLinks = (file, content) => {
  const arrayResponse = [];
  if (!linksRx.test(content)) {
    console.log(
      chalk.bgRed.bold(
        '------ ERROR: No existen enlaces en la ruta ' + `${file}` + '------'
      )
    );
    return [];
  } else {
    const matches = content.match(linksRx);
      matches.forEach((item) => {
      // console.log('Item Value:' + item)
      const matchesText = item.match(textRx);
      let unitText = '';
      let originText = ['No texto'];
      if (matchesText) {
        //console.log(matchestext)
        unitText = matchesText[0];
        originText = unitText.replace(/\[|\]/g, '').split(',');
      }
      const matchesLink = item.match(urlRx);
      //console.log('Matches link: ' + matchesLink)
      const unitLink = matchesLink[0];
      //console.log('Unit link: ' + unitLink)
      const originLink = unitLink.replace(/\(|\)/g, '').split(',');
      //console.log('Origin Link ' + originLink)

      arrayResponse.push({
        href: originLink[0],
        text: originText[0],
        path: `${file}`,
      });
    });
    return arrayResponse;
  }
};

//--------------------------- Función que se encarga de validar el array de los md encontrados------------------

export const analyzeMdFilesArray = (mdFilesArray) => {
  const backupArray = [];
  return new Promise((resolve, reject) => {
    mdFilesArray.forEach((file, index) => {

      readFile(`${file}`, 'utf-8', (err, content) => {
        if (err) {
          reject(
            chalk.bgRed.bold('------ ERROR: Analizar archivos md. ------')
          );
        } else {
          backupArray.push(getLinks(file, content));
          const merge = [].concat(...backupArray);
          if (index === mdFilesArray.length - 1) {
            resolve(merge);
          }
        }
      });
    });
  });
};

//-----------------Función para obtener la estadistica sobre los enlaces de las opción Stats-----------------

export const getStatsResult = (arrayObject) => {
  const arrayLink = arrayObject.map((element) => element.href);
  const uniqueLink = new Set(arrayLink);
  // console.log(uniqueLink, 'yo naci en esta rivera')
  return {
    Total: arrayLink.length,
    Unique: uniqueLink.size,
  };
};

//---------------------------- Función que permite obtener los resultados --validate --stats------------------

export const getResultValidateStats = (arrayObject) => {
  const arrayLink = arrayObject.map((element) => element.href);
  const uniqueLink = new Set(arrayLink);
  const brokenLink = arrayObject.filter((element) => element.ok === 'fail');
  return {
    Total: arrayLink.length,
    Unique: uniqueLink.size,
    Broken: brokenLink.length,
  };
};

//--------------- peticiones HTTP validacion de los linksRx - entrega el objeto con status y ok---------------

export const getHttpResponse = (mdFilesArrayLink) => {
  const validate = mdFilesArrayLink.map((link) => {
    return axios
      .get(link.href) // devuelve una promesa que se resuelve con el resultad de la solicitud
      .then((result) => {
        //objeto de respuesta exitosa de peticiones
        const responseValidate = {
          ...link, // para agregar lo de link
          status: result.status,
          ok: result.statusText,
        };
        return responseValidate;
      })
      .catch((err) => {
        const responseValidate = {
          ...link,
          status: err.response ? 404 : 'ERROR',
          ok: 'fail',
        };
        return responseValidate;
      });
  });
  return Promise.all(validate);
};
