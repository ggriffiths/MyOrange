var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
 
var catalogCourseSchema = new Schema({
    department:  String,  
    number:  String,
    name:  String
});

module.exports = mongoose.model('catalogCourse', catalogCourseSchema);