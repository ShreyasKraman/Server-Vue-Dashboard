'user strict';
var sql = require('./db.js');

//Authorization object constructor
var Auth = function(auth){
    this.emailId = auth.emailId;
    this.password = auth.password;
};

Auth.createUser = function createUser(newAuth, result) {    
    sql.query("INSERT INTO phoodLogin set ?", newAuth, function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });   
};

Auth.authUser = function authUser(auth, result) {
    sql.query("Select password from phoodLogin where emailId = ? ", auth.emailId, function (err, rows) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(rows[0].password);
                if(rows[0].password !== auth.password){
                    result(null,false);
                }
                result(null, true);
            }
        }); 
};

module.exports = Auth;