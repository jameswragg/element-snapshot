const gm = require('gm');
function postprocess(screenshot) {
  return new Promise(function(resolve, reject) {
    gm(screenshot, 'screenshot.png')
      .stroke('#6d6de7')
      .drawLine(0, 1, 0, 4)
      .transparent('#6d6de7')
      .toBuffer('PNG', function(err, data) {
        if (!err) resolve(data);
        else reject(err);
      });
  });
}
exports.postprocess = postprocess;
