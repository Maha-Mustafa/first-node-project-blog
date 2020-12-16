const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//creating a new instance of schema object
const blogSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    snippet:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
}, {timestamps:true});
//creating a model 
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;