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

    sql.then(conn => {
        var rows = conn.query("INSERT INTO phoodLogin set ?",user);
        if(rows)
            rows = conn.query("INSERT INTO phoodUser set ?", phoodUser);
        
        return rows;
    }).then(rows => {
        if(rows)
            return result(null, newUser.id);
        else
            return result(false,null);
    }).catch(error => {
            console.log("error: ", error);
            return result(error, null);
    })
};

module.exports = User;