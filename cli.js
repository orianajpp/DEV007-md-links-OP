import mdLinks from './index.js'
console.log(mdLinks)
mdLinks('/noexiste/').then(() => {})
.catch(err => console.log('Error:', err))