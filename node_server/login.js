const mongo = require('mongodb').MongoClient, url='';  //URL of mongodb  //To be filled later

var output = {
        'Success':'False',
        'result':[],
        'err':'none',
};
var isErr=false;

function logIn(req, res) {
    let user = req.body.username;
    let pass = req.body.password;

    mongo.connect(url, (error, dbo) => {
        if(error) console.error(error);
        console.log('Connected to the database succesfully');
        let db = dbo.db('  '); //To be filled later
        let obj = {
            'username':user,
            'password':pass,
        }
        db.collection(' ').findOne(obj, (error,resTwo) => {   //To be filled later
            if(error) console.log(error);
            else
            if(resTwo==null) {
                output.Success='False';
                isErr=true;
            }
            else {
                output.Success = 'True';
                isErr=false;
                output.result = resTwo;
            }

            dbo.close();
            if(isErr='true'){
                output.Success='False';
                output.err='Some error occurred in login.js';
            }
            else{
                output.Success='True';
                output.err='None';
            }
            res.send(output);
            isErr=false;
            output.Success='False';
            output.err='None';
            output.result=[];
        })
    })
}

module.exports = {
        checkLogin : LogIn,
}