var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var conn=mysql.createConnection({host:"localhost",user:"root",password:"jomyjose",database:"PurchaseRequest"});
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var main_router=express.Router();
module.exports.Enter_Reason=function(reason_array){
	console.log(reason_array);
	  for (var i = 0; i < reason_array.length; i++){
		 			conn.query('INSERT INTO Rejected_Reason (Purchase_id,Rejection_reason) VALUES (?,?)',[reason_array[i].purchase_id,reason_array[i].reason_for_rejection],function(err,rows){
		 				if(err){
		 					console.log(err);
		 				}
		 				else{
		 					console.log(rows);
		 				}
		 			});
	  }
}