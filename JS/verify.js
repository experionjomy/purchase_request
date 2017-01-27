
var jwt = require('jsonwebtoken');



module.exports.verify=function(token,username){
console.log("INSIDE VERIFY");
var decoded = jwt.verify(token, 'jomyjose');

if(decoded.username == username )
{
return true;
}
return false;
}






