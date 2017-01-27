var express=require('express');
var app=express();
var fs=require('fs');
var router= express.Router();
var _ = require('lodash');

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({   
  extended: true
})); 


router.route('/user')
		.get(function(req,res){
		console.log("GET1");
		console.log(__dirname);
		 fs.readFile(__dirname+"/user/user.json", function (err, data) {
		 	   if(err)
		 	   {
		 	   	console.log(err);
		 	   	return;
		 	   }
		       console.log( data );
		       res.end(data.toString());
		   });

		})

		.post(function(req,res){
		console.log("POST");
		console.log(__dirname);
		var postdata = req.body;
		//var user= postdata["user5"];
		 console.log(typeof postdata);
		 fs.readFile(__dirname+"/user/user.json", function (err, data) {
		 	   if(err)
		 	   {
		 	   	console.log(err);
		 	   	return;
		 	   }
		 	   data=JSON.parse(data);
		 	  // data["user5"] = postdata["user5"];
		 	  		data.push(postdata);
		 	   data=JSON.stringify(data);
		 	   fs.writeFile(__dirname+"/user/user.json", data,  function(err) {
		   if (err) {
		      return console.error(err);
		   }
		       console.log( data );
		       res.end(data);
		   });

		});
		});

router.route('/user/:name')
	.get( function(req, res) {
		var name = req.params.name;
		console.log(typeof name);
		console.log("params");
		fs.readFile(__dirname+"/user/user.json", function (err, data) {
		 	   if(err)
		 	   {
		 	   	console.log(err);
		 	   	return;
		 	   }
		 	   data=JSON.parse(data);
		 	   	var userdetails = data.filter(function (el) {
   				 return (el.name === name);
				});
				console.log(userdetails);
               
		       res.end(JSON.stringify(userdetails));
		       
		   });
	  })	
	.delete( function(req, res) {
		var name = req.params.name;
		console.log(typeof name);
		console.log("del");
		fs.readFile(__dirname+"/user/user.json", function (err, data) {
		 	   if(err)
		 	   {
		 	   	console.log(err);
		 	   	return;
		 	   }
		 	   data=JSON.parse(data);
		 	   	var userdetails = data.filter(function (el) {
   				 return (el.name != name);
				});
		 	   	userdetails = JSON.stringify(userdetails);
				fs.writeFile(__dirname+"/user/user.json", userdetails,  function(err) {
		   			if (err) {
		     	 	return console.error(err);
		  					 }
		      			 console.log(userdetails);
		       		 res.end(userdetails);
		   			});
		       
		   });
	  })	

		.put( function(req, res) {
		var name = req.params.name;
		var uname=req.body.name;
		var uage = req.body.age;
		console.log(typeof name);
		console.log("params");
		fs.readFile(__dirname+"/user/user.json", function (err, data) {
		 	   if(err)
		 	   {
		 	   	console.log(err);
		 	   	return;
		 	   }
		 	   data=JSON.parse(data);
		 	   	var userdetails = data.filter(function (el) {
   				 if(el.name === name){
   				 	el.name = uname;
   				 	el.age = uage;

   				 }
   				 return el;
				});
				console.log(userdetails);
               
		       res.end(JSON.stringify(userdetails));
		       
		   });
	  });

// app.get('/user',function(req,res){
// console.log("hai");
// console.log(__dirname);
//  fs.readFile(__dirname+"/user/user.json", function (err, data) {
//  	   if(err)
//  	   {
//  	   	console.log(err);
//  	   	return;
//  	   }
//        console.log( data );
//        res.end(data.toString());
//    });

// });
app.use('/',router);
app.listen(3003, function(){
	console.log("Server Started!!");
})