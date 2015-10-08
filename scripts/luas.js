// Description:
// Dublin LUAS checker script
//
// Dependencies:
//   lodash
//   xml2json
//
// Configuration:
//   None
//
// Commands:
//   hubot luas inbound|outbound <station>
var xml2json = require('xml2json');
var _ = require('lodash');

module.exports = function (robot) {

  var stations = require('./stations.json');
  robot.respond(/luas stations/, function (res) {
    var stationList = _.map(stations, function (station) {
      return ' ' + station.shortName + ' (' + station.displayName + ', ' + station.displayIrishName + ')';
    });
    res.send(stationList.toString());
  });

  robot.respond(/luas (inbound|outbound) (\S.*)/i, function (res) {
    var direction = res.match[1].toLowerCase();
    var stop = res.match[2].toLowerCase();
    var foundStop = _.result(_.find(stations, function (st) {
      return st.shortName.toLowerCase() == stop || st.displayName.toLowerCase() == stop || st.displayIrishName.toLowerCase() == stop;

    }), 'shortName');
    if (foundStop == null) {
      res.send('Such a station does not exist! :o\n List stations with command "luas stations".');
    } else {
      robot.http('http://luasforecasts.rpa.ie/xml/get.ashx?action=forecast&stop=' + foundStop + '&encrypt=false')
          .header('Accept', 'text/html')
          .get()
      (function (err, respo, body) {
        if (err) {
          res.send('Sorry man, I had some issues forecasting your LUAS :(')
        }
        var json = JSON.parse(xml2json.toJson(body));
        var tram = _.result(_.find(json.stopInfo.direction, function (dir) {
          return dir.name.toLowerCase() == direction;
        }), 'tram');
        if (tram && tram.length > 0) {
          var responseString = _.template('Next ${amountOfTrams} tram${multiple} ${direction} at ${stopCode} ${areOrIs} \n');
          var variables = {direction: direction, stopCode: foundStop, multiple : 's', areOrIs : 'are:'};
          if (tram.length == 1) {
            variables.amountOfTrams = '';
            variables.multiple = '';
            variables.atOrIs = 'is:';
            res.send(responseString(variables) +
                'To ' + tram[0].destination + ' in ' + tram[0].dueMins + ' minutes.');
          } else if (tram.length == 2) {
            variables.amountOfTrams = 'Two';
            res.send(responseString(variables) + _.map(tram, function (it) {
                  return 'To ' + it.destination + ' in ' + it.dueMins + ' minutes';
                }));
          } else {
            variables.amountOfTrams = 'three';
            res.send(responseString(variables) + _.take(_.map(tram, function (it) {
                  return 'To ' + it.destination + ' in ' + it.dueMins + ' minutes';
                }), 3));
          }
        } else {
          res.send('Look man, I\'m really sorry. I tried but I wasn\'t able to find any info for you :(');
        }
      });
    }
  });
};
