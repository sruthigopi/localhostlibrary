const express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
const UserData = require('./src/model/UserData');
const BookData =require('./src/model/BookData');
const jwt =require('jsonwebtoken');
const path = require('path');

// const port = process.env.PORT || 8080;
var app = express();
app.use(bodyParser.json());
app.use(cors());
// app.use(express.json({ urlencoded: true }));
// app.use(express.static('./dist/library-frontend'));

//  middleware
 function verifyToken(req,res,next){
    
      if(!req.headers.authorization){
        return res.status(401).send('unautharized request');
      }
  
      let token= req.headers.authorization.split(' ')[1]
   
      if(token=='null'){
        return res.status(401).send('unautharized request');
      }
    
      let payload= jwt.verify(token,'secretkey')
      console.log(payload)
    
      if(!payload){
        return res.status(401).send('unautharized request');
      }
      req.userId=payload.subject
      next()
}

// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname + '/dist//library-frontend/index.html'))
//    });

// SIGNUP data is taken and store to data base
 app.post('/signup',(req,res)=>{
    let userData=req.body
    
    var user={
        useremail:userData.email,
        userpassword:userData.password
    }
    console.log(user)
    var users= new UserData (user);
    users.save()
    });

// login get the informations
// app.get('/signup',(req,res)=>{
   
//     UserData.find()
//     .then((user)=>{
//         res.send(user);
//     })
// })

// login check the informations

app.post('/login',(req,res)=>{
  
   let userData=req.body
  
   UserData.findOne({"useremail":userData.useremail, "userpassword":userData.userpassword},(err,userData)=>{
    if(userData){
        console.log('SUCCESSFULLY LOGGEDIN');

    let payload = {subject:userData.useremail+userData.userpassword}
    let token = jwt.sign(payload,'secretkey')
    res.status(200).send({token})
    }
    else{
        console.log('FAILED TO LOGIN');
        res.status(401).send('invalid credential');
    }
   })
    })
// get book info

app.get('/books',verifyToken ,function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: POST,PATCH, GET, DELETE, PUT, OPTIONS");
    BookData.find()
    .then(function(books){
        res.send(books);
    });
});
// adding book
app.post('/insert',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: POST,PATCH, GET, DELETE, PUT, OPTIONS");
    console.log(req.body);
    var book={
        bookName:req.body.book.bookName,
        authorName:req.body.book.authorName,
        genre:req.body.book.genre,
        image:req.body.book.image,
    }
    var books= new BookData(book);
    books.save()

});

// get for update
app.get('/:id',verifyToken,(req,res)=>{
    const id=req.params.id;
    BookData.findOne({"_id":id})
    .then((book)=>{
     res.send(book)
    });
})

// update
app.put('/update',verifyToken,(req,res)=>{
    console.log(req.body);
    id=req.body._id,
    bookName=req.body.bookName,
    authorName=req.body.authorName,
    genre=req.body.genre,
    image=req.body.image
    BookData.findByIdAndUpdate({"_id":id},
    // find with the id and update with the set ie new productid mans that comming from the frontend
              {
                  $set:{
                    bookName:bookName,
                    authorName:authorName,
                    genre:genre,
                    image:image
                  }
              }
    )
    .then(function(){
        res.send();
    })
})
// delete
app.delete('/remove/:id',verifyToken,(req,res)=>{

    id = req.params.id;
    
    BookData.findByIdAndDelete({"_id":id})
   .then(()=>{
       console.log('data deleted');
    res.send()
   });
});

app.listen(3000,()=>{
    console.log('server is ready');
});