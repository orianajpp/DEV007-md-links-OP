/* eslint-disable no-undef */
const mdLinks = require('../index.js');

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

  // eslint-disable-next-line no-undef
  it('cuando el path no existe rechaza la promesa', async () => {
    try {
      return await mdLinks('/oriana/path/noexiste.md');
    } catch (error) {

      expect(error).toBe('la ruta no existe');
    } 
   
  });
});
