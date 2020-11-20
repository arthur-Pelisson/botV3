const fs = require('./node_modules/fs')
const Path = require('../Path.js')
const ArrayFiles = []

const AllCommand = fs.readdir(Path.Commands, (err, files) => {
    files.forEach(file => {
      file = file.split('.')
      ArrayFiles.push(file[0])
    });
    return ArrayFiles
  });

  exports.ArrayFiles = AllCommand
