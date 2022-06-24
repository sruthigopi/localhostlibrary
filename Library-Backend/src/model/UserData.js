const mongoose =require('mongoose');

mongoose.connect('mongodb+srv://userone:userone@cluster0.oof7c.mongodb.net/LibraryDB?retryWrites=true&w=majority');

const Schema=  mongoose.Schema;

var UserSchema= new Schema({
    useremail:String,
    userpassword:String
})
var UserData = mongoose.model('user',UserSchema);
module.exports=UserData;
