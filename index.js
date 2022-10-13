const basePath = process.cwd();
const { startCreating, buildSetup } = require(`${basePath}/src/Generate.js`);

(() => {
  buildSetup();
  startCreating();
})();
