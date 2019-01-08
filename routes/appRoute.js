'use strict';
module.exports = function(app){

    var Auth = require('../model/appModel');

    app.post('/login',function(req, res) {

        var new_auth = new Auth(req.body);
        
        if(!new_auth.emailId || !new_auth.password){
            res.status(400).send({ error:true, message: 'Please provide username or password' });
        }else{

            Auth.authUser(new_auth,function(err, authFlag) {
    
                if (err)
                  res.send(err);
                
                if(authFlag){
                    res.status(200).send({flag:true});
                }else{
                    res.status(400).send({error:true, message:"Username or password does not match"});
                }
              }); 

        }
    });
};