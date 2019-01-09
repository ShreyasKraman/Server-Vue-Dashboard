'use strict';
var sql = require('mysql');
var uuid = require('uuid/v4');

//User Object
var User = function(user){
    this.id = uuid();
    this.name = user.name;
    this.mobile = user.mobile;
    this.email = user.email;
    this.password = user.password;
}

User.createUser = function createUser(newUser, result) {    
    
    sql.query("INSERT INTO phoodLogin set emailId=? and password=?",[newUser.email, newUser.password],
            function (err,res){

                if(err) {
                    console.log("error: ", err);
                    return result(err, null);
                }
                else{
                    
                    sql.query("INSERT INTO phoodUser set ?", newUser, function (err, res) {
            
                        if(err) {
                            console.log("error: ", err);
                            return result(err, null);
                        }
                        else{
                            return result(null, newUser.id);
                        }
                    });   
                    
                } 

            } )
};
