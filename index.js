var Fs = require('fs');
var Path = require('path');

module.exports = function(robot) {
  var path = Path.resolve(__dirname, 'scripts');
  return Fs.exists(path, function(exists) {
    if (exists) {
      var ref = Fs.readdirSync(path);
      var results = [];
      for (var i = 0; i < ref.length; i++) {
        var file = ref[i];
        results.push(robot.loadFile(path, file));
      }
      return results;
    }
  });
};