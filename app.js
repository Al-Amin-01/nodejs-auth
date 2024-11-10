const express = require('express');
const mongoose = require('mongoose');
const routes =require('./routes/authRoute');
const cookieParser =require('cookie-parser');
const { requireAuth, checkUser } = require('./middlewares/requireAuth');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://alamin:test1234@cluster0.pbxhx.mongodb.net/jwt-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*',checkUser);
app.get('/', requireAuth, (req, res) => res.render('home'));
app.get('/smoothies',requireAuth, (req, res) => res.render('smoothies'));
app.use(routes);

//cookie
// app.get('/set-cookie',(req,res)=>{
//   res.cookie('newUser',true);
//   res.cookie('isStudent',true,{maxAge: 1000*100});
//   res.send('you got cookie');

// })

// app.get('/read-cookie',(req,res)=>{
//   const cookies=req.cookies;
//   console.log(cookies);

//   res.json(cookies);
// })