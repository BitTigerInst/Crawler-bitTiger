var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var githubActivitySchema = new Schema({
        login: String,
        activity: [Schema.Types.Mixed]
});

var githubActivity = mongoose.model('Activity', githubActivitySchema);

module.exports = githubActivity;
