const fs = require('fs-extra');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

function saveFile(fullPath, buffer) {
  writeFileAsync(fullPath, buffer);
}

exports.saveFile = saveFile;
