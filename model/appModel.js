'user strict';
var sql = require('./db.js');

var bcrypt = require('bcrypt');

//Authorization object constructor
var Auth = function(username,password){
    this.emailId = username;
    this.password = password;
};


Auth.authUser = function authUser(auth, result) {
    try{
        sql.query("Select password from phoodLogin where emailId = ? ", auth.emailId, 
            function (err, rows) {             
                
                if(err) {
                    console.log("error: ", err);
                    return result(err, false);
                }
                else{
                    if(bcrypt.compareSync(auth.password,rows[0].password))
                        return result(null,true);
                    return result(null, false);
                }
        }); 
    }catch(error){
        console.log(error);
        return result(error,null);
    }
};

module.exports = Auth;