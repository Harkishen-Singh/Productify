const app = require('express')();
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient,
const path = require('path');
const port = process.env.PORT || 5000;
const login = require('./login');
const signup = require('./signup');

url = '0.0.0.0';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true, }));
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req ,res) => {
    res.send('Serving backend at host => '+host+' port => '+port);
})

app.post('/login', (req, res) => {
    login.checkLogin(req, res);
})

app.post('/signup', (req, res) => {
    signup.checkSignup(req,res)
})

const server = app.listen(port, url, error => {
    if(error) throw error;
    else {
        console.log('Running at \n'+server.address().address + '\t' +server.address().port);
    }
})
