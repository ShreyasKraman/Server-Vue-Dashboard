'use strict';
module.exports = function(app){

    var Auth = require('../model/appModel');

    var User = require('../model/userModel');

    var uuid = require('uuid/v4');

    app.get('/login', function(req, res) {

        var new_auth = new Auth(req.query.username,req.query.password);
        
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

    app.post('/register',function(req,res){

        var id = uuid(); 

        var new_user = new User(req.body,id);

        console.log(new_user);

        if(!new_user.emailId || !new_user.password || !new_user.name){
            return res.status(400).send({ error:true, message: 'Name, username and password are mandatory' });
        }

        User.createUser(new_user, function(err, userId){

            if (err)
                return res.status(400).send({error:true,message:"Please try after some time!"});

            if(userId)
                return res.status(200).send({flag:true, UserID:userId});
            
            return res.status(400).send({error:true, message:"Username or password does not match"});
    
        }); 

    });
};