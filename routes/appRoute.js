'use strict';
module.exports = function(app){

    var Auth = require('../model/appModel');

    app.post('/login',function(req, res) {

        var new_auth = new Auth(req.body);
        
        if(!new_auth.emailId || !new_auth.password){
            return res.status(400).send({ error:true, message: 'Please provide username or password' });
        }else{

            Auth.authUser(new_auth,function(err, authFlag) {

                if (err)
                  return res.status(400).send({error:true,message:"Please try after some time!"});

                    if(authFlag){
                        return res.status(200).send({flag:true});
                    }else{
                        return res.status(400).send({error:true, message:"Username or password does not match"});
                    }

              }); 

        }
    });
};