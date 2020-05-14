const express = require('express');
const cors = require('cors')
const app = express();
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '192.168.1.16',
    user : 'postgres',
    password : 'ztm',
    database : 'facerecognition'
  }
});

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => { res.send(database.users) })
app.post('/signin', signin.handleSignIn(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfile(db));
app.put('/image', image.handleImage(db));
app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

app.listen(3000, () => {
    console.log("App is running on port 3000.")
})
