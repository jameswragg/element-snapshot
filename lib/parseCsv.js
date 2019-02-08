const fs = require('fs-extra');
const csv = require('fast-csv');
const inputFile = './site-list.csv';

function parseCsv() {
  return new Promise(function(resolve, reject) {
    const stream = fs.createReadStream(inputFile);
    const output = [];

    csv
      .fromStream(stream, {
        headers: ['URL', 'Selector', 'ElName'],
        ignoreEmpty: true,
        trim: true
      })
      .on('data', function(data) {
        output.push(data);
      })
      .on('end', function() {
        // console.log('done');
        // console.log(output);
        resolve(output);
      });
  });
}

exports.parseCsv = parseCsv;
