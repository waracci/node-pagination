//declare the collection and fill the database
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
    category: String,
    name: String,
    price: Number,
    cover: String
})

module.exports = mongoose.model('Product', productSchema);