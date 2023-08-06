#!/usr/bin/env node
import chalk from 'chalk';
import mdLinks from './index.js';
// console.log(mdLinks);
mdLinks().then(() => {})
  .catch((err) => console.log('Error:', err));

// console.log(process.argv[2]);
// console.log(process.argv[3]);
// console.log(process.argv[4]);

const path = process.argv[2];
const optionOne = process.argv[3];
const optionTwo = process.argv[4];

if (path) {
  console.log(chalk.bgBlue.bold('---------------------- Comenzar ------------------------'));
  // if (optionOne === undefined && optionTwo === undefined) {
  // mdLinks(path, { validate: false, stats: false }).then(result => result)
  if (optionOne === '--validate' && optionTwo === undefined) {
    mdLinks(path, { validate: true, stats: false }).then((result) => result)
      .catch((err) => console.log(err));
  } else if (optionOne === '--stats' && optionTwo === undefined) {
    mdLinks(path, { validate: false, stats: true }).then((result) => result)
      .catch((err) => console.log(err));
  } else if ((optionOne === '--validate' && optionTwo === '--stats') || (optionOne === '--stats' && optionTwo === '--validate')) {
    mdLinks(path, { validate: true, stats: true }).then((result) => result)
      .catch((err) => console.log(err));
  } else {
    console.log(chalk.inverse.bold('------ ERROR: No existe la opción por favor probar con: --validate, --stats, -- stats --validate" ------'));
  }
} else {
  console.log('------------La ruta no existe -------------');
}
