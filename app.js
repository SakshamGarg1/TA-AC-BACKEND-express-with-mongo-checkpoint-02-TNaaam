var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var userRouter =require('./routes/user');

//connect to mongoose
mongoose.connect('mongodb://localhost/user-diary',{
    useNewUrlParse: true,
    useUnifiedTopology: true
},
(err)=>{
    console.log(err?"Connected false" : "Connected true")
});

var app = express();

//middleware

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,"views"));

app.use(express.urlencoded( {extended: false} ));

app.get('/',(req,res)=>{
    res.render('index.ejs')
});

app.use('/users', userRouter);

//handle err
app.use((req,res,next)=>{
    res.status(404).send('Page not found')
})

app.listen(3000,()=>{
    console.log('server is running on port 3K')
})