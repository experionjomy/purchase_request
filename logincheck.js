
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var cookieparser = require('cookie-parser');
var conn=mysql.createConnection({host:"localhost",user:"root",password:"jomyjose",database:"PurchaseRequest"});
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var main_router=express.Router();


module.exports.loginCheck=function(req,res){
var userName=req.body.eid;
var password=req.body.password;

var js = {
			status:"", 
			message:"", 
			userType:"",
		
		
		};

console.log("hello ", req.body.eid);
conn.query('select password,flag from user where username=? and password=?',[userName,password], function(err, rows){
	console.log(rows+userName+password);
	console.log(err);
	if(rows.length>0 && !err){

		if(rows[0].flag=== 1){ 
			js.status=200;
			js.message="success";
			js.userType="Admin";
			var token = jwt.sign({ username: userName,role:"Admin"}, 'jomyjose',{expiresIn:60*10000});
			js.token=token;
			js.username = userName;
			console.log("js",js);
			 res.send(js);
			
		}
		else{
			js.status=200;
			js.message="success";
			js.userType="User";
			var token = jwt.sign({ username: userName,role:"User"}, 'jomyjose',{expiresIn:60*10000});
			js.token=token;
			js.username=userName;
			console.log(js.token);
			res.send(js);
		}

	}
	else{
			console.log("error in query or no user");
			js.status=403;
			js.message="login failed";
			js.userType="null";
			res.send(js);

		}
});
}
