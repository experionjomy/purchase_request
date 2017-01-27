var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var conn=mysql.createPool({host:"localhost",user:"root",password:"jomyjose",database:"PurchaseRequest"});
var app = express();
var validator = require('validator');
//var conn=require('./database.js');
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var main_router=express.Router();
var path = require('path');
var admin = require('./admin');
var user = require('./user');

app.set('views', path.join(__dirname, '..', 'HTML'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(__dirname + './../'));
app.use('/CSS', express.static(__dirname + './../CSS'));


app.get('/', function(req, res) {
    res.sendFile('login.html', { root: __dirname + '/../' });
});

var login=require('./logincheck.js');
 main_router.post('/', login.loginCheck);




main_router.route('/user_view_old')
.get(function(req,res){
	conn.query('SELECT Purchase_id,Status,Created_date,Purchase_title from Purchase_Details',function(err,rows){
		if(err){
			console.log(err);
		}
		else{
			// console.log(rows);
			var result_rows=JSON.stringify(rows);
			res.send(result_rows);
		}
	});

});

app.use('/',admin);
app.use('/',main_router);
app.use('/',user);


// var user_router = require('../userRoute.js');
// var purchase_router = require('../purchaseRoute.js');

// app.use('/user',user_router);
// app.use('/purchase',purchase_router);



var server = app.listen(8081,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("Listening at %s on port %s", host, port);
});
