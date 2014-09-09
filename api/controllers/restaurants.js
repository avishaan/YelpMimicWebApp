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
  request(config.UG + '/restaurants?ql=restID=' + restId, function(err, response, body){
    if (err){
      res.send(err);
    } else {
      res.send(body);
    }
  });
}
