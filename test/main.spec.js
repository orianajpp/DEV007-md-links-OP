import {
  existPath,
  pathRelativetoAbsolute,
  validateFile,
  mdFiles,
  validateDirectory,
  getAllFilesDirectory,
  analyzeMdFilesArray,
  getResultValidateStats,
  getStatsResult,
  getLinks,
  getHttpResponse,
  pathIsAbsolute,
} from '../main.js';

// console.log(existPath);
describe('existPath', () => {
  it('Debe ser una función', () => {
    expect(typeof existPath).toBe('function');
  });
  it('Debe validar cuando el path existe', () => {
    expect(existPath('C:/Users/Nova Electra/Desktop/DEV007-md-links-OP')).toEqual(true);
  });
  it('Debe validar cuando el path no existe', () => {
    expect(existPath('../testing/oriana.md')).toEqual(false);
  });
});

describe('pathIsAbsolute', () => {
  it('Debe ser una función', () => {
    // typeof para encontrar el tipo de dato de una variable de JS
    expect(typeof pathIsAbsolute).toBe('function');
  });
  it('Debe validar si el path es absoluto', () => {
    expect(pathIsAbsolute('C:/Users/Nova Electra/Desktop/DEV007-md-links-OP')).toEqual(true);
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
  it('Debe validar si la ruta es una archivo', () => {
    expect(validateFile('PR/pruebaX.md')).toBe(true);
  });
  it('Debe validar si la ruta no es una archivo', () => {
    expect(validateFile('./P')).toBe(false);
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
    path: 'C://Users//Nova Electra//Desktop//DEV007-md-links-OP//PR/pruebaX.md',
  },
  {
    href: 'https://nodejs.org/docs/latest/api/modules.html',
    text: 'Modules: CommonJS modules - Node.js Docs',
    path: 'C://Users//Nova Electra//Desktop//DEV007-md-links-OP//PR/pruebaX.md',
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
    expect(analyzeMdFilesArray(['./PR/pruebaX.md'])).resolves.toEqual(arrayObjects);
  });
  it('debe rechazar la promesa con el mensaje de error si ocurre un error al leer un archivo', async () => {
    const arrayPathMderr = ['./PR/op.md'];

    return analyzeMdFilesArray(arrayPathMderr)
      .catch((err) => {
        expect(err).toMatch('ERROR: error al analizar archivos .md');
      });
  });
});

describe('getStatsResult, entrega un objeto con dos propiedades total y unique', () => {
  it('debe ser una función', () => {
    expect(typeof getStatsResult).toBe('function');
  });
  it('retorna un objeto con dos propiedades', () => {
    expect(getStatsResult(arrayObjects)).toEqual({ Total: 2, Unique: 2 });
  });
});

describe('getResultValidateStats, entrega un objeto con tres propiedades total, unique y broken', () => {
  it('debe ser una función', () => {
    expect(typeof getResultValidateStats).toBe('function');
  });
  it('retorna un objeto con dos propiedades', () => {
    expect(getResultValidateStats(arrayObjects)).toEqual({ Total: 2, Unique: 2, Broken: 0 });
  });
});

describe('getLinks entrega el array de objetos luego de hacer match con los links', () => {
  it('debe ser una función', () => {
    expect(typeof getLinks).toBe('function');
  });
  it('debe devolver un array vacío si no hay enlaces', () => {
    const file = './OP.md';
    const cont = 'no hay nada';
    expect(getLinks(file, cont)).toEqual([]);
  });
});

const validateObjects = [
  {
    href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
    text: 'Función Callback - MDN',
    path: 'C://Users//Nova Electra//Desktop//DEV007-md-links-OP//PR/pruebaX.md',
    status: 200,
    ok: 'OK',
  },
  {
    href: 'https://nodejs.org/docs/latest/api/modules.html',
    text: 'Modules: CommonJS modules - Node.js Docs',
    path: 'C://Users//Nova Electra//Desktop//DEV007-md-links-OP//PR/pruebaX.md',
    status: 200,
    ok: 'OK',
  },
];

const validateObjectsFail = [{
  href: 'http://algo.com/2/3/',
  text: 'No texto',
  path: 'C:\\Users\\Nova Electra\\Desktop\\DEV007-md-links-OP\\PRUEBA/prueba.md',
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
  it('debe contar la cantidad de valores "fail" en ok', () => getHttpResponse(validateObjectsFail)
    .then((result) => {
      const failCount = result.filter((item) => item.ok === 'fail').length;
      expect(failCount).toEqual(1);
    }));
});
