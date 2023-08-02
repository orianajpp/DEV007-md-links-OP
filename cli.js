import chalk from 'chalk';
import mdLinks from './index.js';
// console.log(mdLinks);
mdLinks().then(() => {})
  .catch((err) => console.log('Error:', err));

console.log(process.argv[2]);
console.log(process.argv[3]);
console.log(process.argv[4]);

const path = process.argv[2];
const option1 = process.argv[3];
const option2 = process.argv[4];

if (path) {
  console.log(chalk.bgBlue.bold('----- MdLinks Comenzar ------'));
  // if (option1 === undefined && option2 === undefined) {
  // mdLinks(path, { validate: false, stats: false }).then(result => result)
  if (option1 === '--validate' && option2 === undefined) {
    mdLinks(path, { validate: true, stats: false }).then((result) => result)
      .catch((err) => console.log(err));
  } else if (option1 === '--stats' && option2 === undefined) {
    mdLinks(path, { validate: false, stats: true }).then((result) => result)
      .catch((err) => console.log(err));
  } else if ((option1 === '--validate' && option2 === '--stats') || (option1 === '--stats' && option2 === '--validate')) {
    mdLinks(path, { validate: true, stats: true }).then((result) => result)
      .catch((err) => console.log(err));
  } else {
    console.log(chalk.inverse.bold('------ ERROR: No existe la opción por favor probar con: --validate, --stats, -- stats --validate" ------'));
  }
}
