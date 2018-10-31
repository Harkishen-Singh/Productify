const app = require('express')();
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;
const port = process.env.PORT || 5000;
const login = require('./login');
const signup = require('./signup');
uri='mongodb+srv://muskan:movehack@cluster0-ldloc.mongodb.net/code_zero?retryWrites=true';
// uri = 'mongodb://127.0.0.1:27017'
url = '0.0.0.0';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true, }));
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req ,res) => {
    res.send('Serving backend at host => '+url+' port => '+port);
})

app.post('/login', (req, res) => {
    login.checkLogin(req, res);
})
app.get('/saveArticle', (req, res) => {
    let obj = req.query.object;
    console.log(obj)
    obj = JSON.parse(obj)
    mongo.connect(uri, (e, dbo) => {
        if(e) console.error(e);
        console.warn('[SUCCESS] connected to the database');
        let db = dbo.db('code_zero');
        db.collection('savedArticles').insertOne(obj, (e,res1) =>{
            if(e) console.error(e);
            else {
                res.send('Success')
            }
        })
        dbo.close();
    })

});

app.get('/getArticles', (req, res) => {
    console.warn('received request')
    mongo.connect(uri, (e, dbo) => {
        if(e) console.error(e);
        console.warn('[SUCCESS] connected to the database');
        let db = dbo.db('code_zero');
        db.collection('savedArticles').find({}).toArray((e, result) => {
            if(e) throw e;
            else{
                console.warn(result)
                res.send(result)
            }
        })
        dbo.close();
    })
})

app.post('/signup', (req, res) => {
    signup.checkSignup(req,res)
})

const server = app.listen(port, '0.0.0.0',(e) => {
    if(e) throw e;
    else {
        console.log('Running at \n'+server.address().address + '\t' +server.address().port);
    }
})

