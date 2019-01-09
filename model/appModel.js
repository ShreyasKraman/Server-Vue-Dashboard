'user strict';
var sql = require('./db.js');

//Authorization object constructor
var Auth = function(auth){
    this.emailId = auth.emailId;
    this.password = auth.password;
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