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
    try{
        sql.query("Select password from phoodLogin where emailId = ? ", auth.emailId, 
            function (err, rows) {             
                
                if(err) {
                    console.log("error: ", err);
                    return result(err, false);
                }
                else{
                    if(rows[0].password !== auth.password){
                        return result(null,false);
                    }
                    return result(null, true);
                }
        }); 
    }catch(error){
        console.log(error);
        return result(error,false);
    }
};

module.exports = Auth;