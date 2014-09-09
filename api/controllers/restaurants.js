'use strict'

var request = require('request');
var async = require('async');

var config = require('../../config/config.js');

module.exports = {
  getRestaurants: getRestaurants,
  getRestaurantById: getRestaurantById
};

function getRestaurants(req, res){
  request(config.UG + '/restaurants', function(err, response, body){
    if (err){
      res.send(err);
    } else {
      res.send(body);
    }
  });
}

function getRestaurantById(req, res){
  var restId = req.swagger.params.id.value;
  async.parallel({
    restaurant: function(cb){
      request(config.UG + '/restaurants?ql=restID=' + restId, function(err, response, body){
        if (err){
          res.send(err);
        } else {
          var result = JSON.parse(body);
          cb(null, result);
        }
      });
    },
    reviews: function(cb){
      async.waterfall([
        function(callback){
        request(config.UG + "/reviews/?ql=restID=" + restId, function(err, response, body){
          if (err) {
            res.send(err);
          } else {
            var data = JSON.parse(body);
            callback(null, data);
          }
        });
      },
      function(data, callback){
        var l = data.entities.length;
        var aggregate = 0;
        var i;
        for (i = 0; i < l; i++){
          aggregate += data.entities[i].rating;
        }
        aggregate = {
          aggregate : +(aggregate/i).toFixed(2)
        };
        callback(null, data, aggregate);
      }
      ], cb);
    }},
    function(err, results){
      res.send(results);
    
  });
}
