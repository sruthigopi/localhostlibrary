const mongoose =require('mongoose');

mongoose.connect('mongodb+srv://userone:userone@cluster0.oof7c.mongodb.net/LibraryDB?retryWrites=true&w=majority');


const Schema=  mongoose.Schema;

var BookSchema= new Schema({
    bookName:String,
    authorName:String,
    genre:String,
    image:String
})
var BookData = mongoose.model('books',BookSchema);
module.exports=BookData;