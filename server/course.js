var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
 
var courseSchema = new Schema({
    name:  String,
    department:  String,
    number:  String,
    location: String,
    days: String,    
    time: String
});

module.exports = mongoose.model('Course', courseSchema);