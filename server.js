const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const knex = require('knex')


const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [{
    id: '123',
    name: 'Andrei',
    email: 'john@gmail.com',
    password:"qwert",
    entries: 0,
    joined: new Date()
  },
  {
    id: '124',
    name: 'Tim',
    email: 'tim@gmail.com',
    password:"asdfg",
    entries: 0,
    joined: new Date()
  }]
  
}

app.get('/', (req,res)=> {
    res.send(database.users);
})
app.post('/signin', (req,res)=>{
      if (req.body.email === database.users[1].email && 
      req.body.password === database.users[1].password) {
    res.json(database.users[1]);
  } else {
     
    res.status(400).json('access denied');
  }
})

app.post('/register', (req, res) => {
  database.users.push({
    id: '125',
    name: req.body.name,
    email: req.body.email,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length - 1])
})
app.get('/profile/:userId', (req, res) => {
    let found= false;
  database.users.forEach(user => {
    if (user.id === req.params.userId) {
        found= true;
      return res.json(user);
    }
  })
  if (!found) {
      return res.status(400).json('notfound')
  }
})
app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
     database.users.forEach(user => {   
    if (user.id === id) {
        found = true;
      user.entries++
      res.json(user.entries)    
    }  
   })
   if (!found) {
      return res.status(400).json('not found')
  }
})
app.listen(5020, ()=> console.log('server started on port 5020'))