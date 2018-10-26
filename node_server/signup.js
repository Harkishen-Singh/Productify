const mongo = require('mongodb').MongoClient,url='';   //URL of mongodb  //To be filled later

var output = {
    'Success':'False',
    'err':'none',
    'result':[],
};
var isErr=false, unique = false;

function resSend(res) {
    if(isErr==true){
        output.Success='False';
        output.err='some error occuered in signUp.js'
    }
    else{
        output.Success='True';
        output.err='none';
    }
    res.send(output);
    output.Success='False';
    output.err='none';
    output.result=[];
}

function signUps(req, res) {
    let email = req.body.email,
        username = req.body.username,
        password = req.body.password
    
    mongo.connect(url, (error, dbo) => {
        if(error) console.error(error);
        console.log('[SUCCESS] connected to the database');
        let db = dbo.db(' ');  //To be filled later
        collection =  db.listCollections();
        let obj = {
            'email':email,
            'username':username,
            'password':password,
        }

        db.collection('User_details').insertOne(obj, (error,res1) =>{
            if(error) console.error(error);
            else
                console.log('[SUCCESS] inserted into the database with username='+username);
            console.log(res1)
            isErr=false;
            dbo.close();
            resSend(res);  
        })   
    } )
}

module.exports = {
    checkSignup : signUps,
}