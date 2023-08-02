import { existPath } from '../main.js';

// console.log(existPath);
describe('existPath', () => {
  it('Debe ser una función', () => {
    // typeof para encontrar el tipo de dato de una variable de JS
    expect(typeof existPath).toBe('function');
  });
});
