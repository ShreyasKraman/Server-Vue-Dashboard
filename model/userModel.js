'use strict';
var sql = require('./db.js');

var bcrypt = require('bcrypt');

//User Object
var User = function(user,id){
    this.id = id;
    this.name = user.name;
    this.mobile = user.mobile;
    this.emailId = user.email;
    this.password = user.password;
}

User.createUser = function createUser(newUser, result) {    

    var phoodUser = {id: newUser.id, name:newUser.name, mobile:newUser.mobile, emailId:newUser.emailId}

    var salt = bcrypt.genSaltSync(10);

    var password = bcrypt.hashSync(newUser.password, salt);

    var user = {emailId: newUser.emailId, password:password};

    if(!user.password){
        return result("error",null);
    }

    sql.query("INSERT INTO phoodLogin set ?",user, function (err,res){

        if(err) {
            console.log("error: ", err);
            return result(err, null);
        }
        else{
                    
            sql.query("INSERT INTO phoodUser set ?", phoodUser, function (err, res) {
            
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

module.exports = User;