var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
 
var catalogCourseSchema = new Schema({
    department:  String,  
    number:  Number,
    name:  String
});

module.exports = mongoose.model('CatalogCourse', catalogCourseSchema);