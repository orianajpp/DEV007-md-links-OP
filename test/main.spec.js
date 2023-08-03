import {
  existPath,
  pathRelativetoAbsolute,
  validateFile,
  mdFiles,
  validateDirectory,
  getAllFilesDirectory,
  analyzeMdFilesArray,
  getStatsResult,
  getLinks,
  getHttpResponse,
} from '../main.js';

// console.log(existPath);
describe('existPath', () => {
  it('Debe ser una función', () => {
    // typeof para encontrar el tipo de dato de una variable de JS
    expect(typeof existPath).toBe('function');
  });
  it('Debe validar cuando el path existe', () => {
    expect(existPath('C:/Users/Nova Electra/Desktop/DEV007-md-links-OP')).toEqual(true);
  });
  it('Debe validar cuando el path no existe', () => {
    expect(existPath('../testing/oriana.md')).toEqual(false);
  });
});

describe('pathRelativetoAbsolute', () => {
  it('Debe ser una funcion', () => {
    expect(typeof pathRelativetoAbsolute).toBe('function');
  });
  it('Debe transformar una ruta relativa a absoluta', () => {
    expect(pathRelativetoAbsolute('PR/pruebaX.md')).toBe('C:\\Users\\Nova Electra\\Desktop\\DEV007-md-links-OP\\PR\\pruebaX.md');
  });
});
describe('validateFile', () => {
  it('Debe ser una funcion', () => {
    expect(typeof validateFile).toBe('function');
  });
  it('Debe Debe validar si la ruta es una archivo', () => {
    expect(validateFile('PR/pruebaX.md')).toBe(true);
  });
  it('Debe Debe validar si la ruta no es una archivo', () => {
    expect(validateFile('./PA')).toBe(false);
  });
});

describe('mdFiles', () => {
  it('Debe ser una función', () => {
    expect(typeof mdFiles).toBe('function');
  });
  it('Debe devolver true si el archivo es tipo .md', () => {
    expect(mdFiles('./README.md')).toBe(true);
  });
  it('Debe devolver false si el archivo no es tipo .md', () => {
    expect(mdFiles('./package.json')).toBe(false);
  });
});
describe('validateDirectory', () => {
  it('Debe ser una función', () => {
    expect(typeof validateDirectory).toBe('function');
  });
  it('Debe validar si la ruta es directorio', () => {
    expect(validateDirectory('./PRUEBA'));
  });
});
describe('getAllFilesDirectory', () => {
  it('Debe devolver los archivos del directorio', () => {
    const files = [
      './PR/hola.js',
      './PR/pruebaX.md',
    ];
    expect(getAllFilesDirectory('./PR')).toEqual(files);
  });
});

const arrayObjects = [
  {
    href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
    text: 'Función Callback - MDN',
    path: 'C:\\Users\\Nova Electra\\Desktop\\DEV007-md-links-OP\\PR/pruebaX.md',
  },
  {
    href: 'https://nodejs.org/docs/latest/api/modules.html',
    text: 'Modules: CommonJS modules - Node.js Docs',
    path: 'C:\\Users\\Nova Electra\\Desktop\\DEV007-md-links-OP\\PR/pruebaX.md',
  },
];

describe('analyzeMdFilesArray, entrega el array de objetos luego de leer cada archivo', () => {
  it('debe ser una función', () => {
    expect(typeof analyzeMdFilesArray).toBe('function');
  });
  it('retorna una promesa', () => {
    expect(typeof analyzeMdFilesArray([]).then).toBe('function');
  });
  it('retorna un array de objetos', () => {
    expect(analyzeMdFilesArray(['./PR/pruebaX.md'])).resolves.toStrictEqual(arrayObjects);
  });
  it('debe rechazar la promesa con el mensaje de error', () => {
    const arrayPathMd = ['./PR/hola.js'];
    return analyzeMdFilesArray(arrayPathMd).catch((err) => {
      expect(err).toEqual('------ ERROR: Analizar archivos md. ------');
    });
  });
  it('debe rechazar la promesa con el mensaje de error si ocurre un error al leer un archivo', () => {
    const arrayPathMderr = ['./PR/op.md'];

    return analyzeMdFilesArray(arrayPathMderr)
      .catch((err) => {
        expect(err).toMatch('------ ERROR: Analizar archivos md. ------');
      });
  });
});
describe('getStatsResult, entrega un objeto con dos propiedades total y unique', () => {
  it('debe ser una función', () => {
    expect(typeof getStatsResult).toBe('function');
  });
  it('retorna un objeto con dos propiedades', () => {
    expect(getStatsResult([arrayObjects])).toStrictEqual({ Total: 2, Unique: 2 });
  });
});
/* const content = `
[Función Callback - MDN](https://developer.mozilla.org/es/docs/Glossary/Callback_function)
[Modules: CommonJS modules - Node.js Docs](https://nodejs.org/docs/latest/api/modules.html)`;
 */
describe('getLinksDocument, entrega el array de objetos luego de hacer match con los links', () => {
  it('debe ser una función', () => {
    expect(typeof getLinks).toBe('function');
  });
  it('debe devolver un array vacío si no hay enlaces', () => {
    const file = './OP.md';
    const cont = 'NO HAY ENLACES';
    expect(getLinks(file, cont)).toEqual([]);
  });

  it('retorna un array de objetos', () => {
    const file = './OP.md';
    const cont = `
[Función Callback - MDN](https://developer.mozilla.org/es/docs/Glossary/Callback_function)
[Modules: CommonJS modules - Node.js Docs](https://nodejs.org/docs/latest/api/modules.html)`;
    expect(getLinks(file, cont)).toStrictEqual(arrayObjects);
  });
});
const validateObjects = [
  {
    href: 'https://www.google.com/?hl=es',
    path: './testing/archivo.md',
    text: 'Google.com',
    status: 200,
    ok: 'OK',
  },
  {
    href: 'https://github.com/lauraflorezt/DEV004-md-links/blob/main/functions.js',
    path: './testing/archivo.md',
    text: 'Link en git',
    status: 404,
    ok: 'fail',
  },
];
describe('getHttpResponse, entrega el array de objetos sumando el status y statustext', () => {
  it('debe ser una función', () => {
    expect(typeof getHttpResponse).toBe('function');
  });
  it('retorna una promesa', () => {
    expect(typeof getHttpResponse([]).then).toBe('function');
  });
  it('retorna un array de objetos', () => {
    expect(getHttpResponse(arrayObjects)).resolves.toStrictEqual(validateObjects);
  });
  it('debe contar la cantidad de valores "fail" en ok', () => getHttpResponse(validateObjects)
    .then((result) => {
      const failCount = result.filter((item) => item.ok === 'fail').length;
      expect(failCount).toEqual(1);
    }));
});
