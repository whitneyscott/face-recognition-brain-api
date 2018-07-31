const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
//*** works 
const db = knex({
  client: 'pg',
  connection: {
    host : 'arcane-basin-64415',
    user : 'postgres',
    password : '***data_forever+++' ,
    database : 'postgres'
  }
});
// // having a ton of difficulty setting up db with new name, user pw
// const postgres = knex({
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     user : 'whitneyscott',
//     password : '' ,
//     database : 'smart-brain'
//   }
// });
db.select('*').from('users').then(data => {
  console.log(data);
});

const app = express();

app.use(cors())    
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send(database.users)})
app.post('/signin', (req,res)=> {signin.handleSignIn(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

const PORT = process.env.PORT;
app.listen(process.env.PORT ||3000, ()=> {
  console.log(`app is running on port ${process.env.PORT}`);
})
