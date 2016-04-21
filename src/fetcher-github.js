'use strict';

var Activity = require('./models/activity');
var request = require('request');
var json = require('json-promise');

var userActivity = [];
var options = {
    headers: {
        'User-Agent': 'request'
    },
    url: 'https://api.github.com/users/Yuqin1990/events'
}

function callback(error, response, body) {
    json.parse(body)
	.then(function onParse(obj) {
        parseActivity(obj);
    })
	.catch(function onParseError(e) {
		console.log(e);
	});
}

function parseActivity(obj) {
    obj.map(function(item) {
        userActivity.push({
            type: item.type,
            actor: item.actor,
            repo: item.repo,
            created_at: item.created_at
        });
    });

    var activityObj = new Activity({
        login: "Yuqin1990",
        activity: userActivity
    });

    Activity.update({ login: activityObj.login }, {$set: { activity: activityObj.activity }}, {upsert: true}, function(err) {
        if (err) throw err;
        console.log('Activity saved successfully!');
    });
}

module.exports = {
    fetch: function() {
        return request(options, callback);
    }
}
