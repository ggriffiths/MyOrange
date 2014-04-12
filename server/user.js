var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
 
var userSchema = new Schema({
    displayName:  String,
    email: String,
    major: String,
    year: String,
    courses: [String],
    password: String,
	picture: String,
});

module.exports = mongoose.model('User', userSchema);