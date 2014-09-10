var request = require('request');
var async = require('async');
var config = require('./config');
var restaurantData = require('./data/restaurants.json');
var reviewsData = require('./data/reviews.json');
var usersData = require('./data/users.json');

async.parallel({
    restaurants: function(callback) {
        request.post(config.UG + "/restaurants", {
            form: JSON.stringify(restaurantData)
        }, function(err, response, body) {
            if (err) {
                console.log('boom');
            } else {
                var data = JSON.parse(body);
                callback(null, data);
            }
        });
    },
    reviews: function(callback) {
        request.post(config.UG + "/reviews", {
            form: JSON.stringify(reviewsData)
        }, function(err, response, body) {
            if (err) {
                console.log('boom');
            } else {
                var data = JSON.parse(body);
                callback(null, data);
            }
        });
    },
    users: function(callback) {
        request.post(config.UG + "/users", {
            form: JSON.stringify(usersData)
        }, function(err, response, body) {
            if (err) {
                console.log('boom');
            } else {
                var data = JSON.parse(body);
                callback(null, data);
            }
        });
    }
}, function(err, results) {
    console.log('Success!\nSample data has been imported into your database.')
});