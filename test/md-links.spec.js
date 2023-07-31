import mdLinks from '../index.js';

describe('mdLinks', () => {
  it('should...', () => {
    console.log('FIX ME!');
  });

  it('cuando el path no existe rechaza la promesa', async () => {
    try {
      return await mdLinks('/oriana/path/noexiste.md');
    } catch (error) {
      expect(error).toBe('la ruta no existe');
    }
  });
});
