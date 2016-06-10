var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    title: String
});

module.exports = mongoose.model('Course', courseSchema);