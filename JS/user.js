var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "jomyjose",
    database: "PurchaseRequest"
});
var app = express();
var validator = require('validator');
//var conn=require('./database.js');
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var user_router = express.Router();
var path = require('path');


var user_home = require('./user_home.js');
var verification = require('./verify.js');



user_router.route('/enter_purchasedata/:key').post(function(req, res) {
    var js = {
        "status": "",
        "message": ""
    };
    var key_value = req.params.key;
    key_value = JSON.parse(key_value);
    console.log("token" + key_value.token);
    var data = req.body;
    var username = key_value.username;
    var token = key_value.token;
    if (key_value.token == "") {
        console.log("invalid user");
    } else {
        console.log("valid user");
        if (verification.verify(token, username)) {
            user_home.callValidation(data, username)
                .then(function() {
                    user_home.enter_Purchasedata(res, data, username);
                })
                .catch(function() {
                    js.status = 403;
                    js.message = "error";
                    res.send(js);
                });

        }
    }
});




user_router.route('/user_view_all:key')

.get(function(req, res) {

    var key_value = req.params.key;
    key_value = JSON.parse(key_value);
    console.log("token" + key_value.token);
    var data = req.body;
    var username = key_value.username;
    var token = key_value.token;
    if (key_value.token == "") {
        console.log("invalid user");
    } else {
        if (verification.verify(token, username)) {
            conn.query('SELECT Purchase_id,Status,Created_date,Purchase_title from Purchase_Details WHERE username=?', [username], function(err, rows) {
                if (err) {
                    console.log(err);
                } else {
                    // console.log(rows);
                    var result_rows = JSON.stringify(rows);
                    res.send(result_rows);
                }
            });
        }

    }

});

user_router.route('/user_view_all-more_rejected')
    .post(function(req, res) {
        var a = req.body.pid;


        conn.query('SELECT Item_name,Status,Rejection_reason,Item_description,Quantity,Purchase_title,Purchase_Details.Purchase_id AS pid,Priority,Created_date,Related_project FROM Purchase_Details INNER JOIN Item_List INNER JOIN Rejected_Reason ON Purchase_Details.Purchase_id=Item_List.Purchase_id AND Purchase_Details.Purchase_id=Rejected_Reason.Purchase_id WHERE Item_List.Purchase_id= ?', [a], function(err, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log(rows);
                var result_rows = JSON.stringify(rows);
                res.send(result_rows);

            }
        });


    });
user_router.route('/user_view_all-more')
    .post(function(req, res) {
        var a = req.body.pid;


        conn.query('SELECT Item_name,username,Status,Item_description,Quantity,Purchase_title,Purchase_Details.Purchase_id AS pid,Priority,Created_date,Related_project FROM Purchase_Details INNER JOIN Item_List ON Purchase_Details.Purchase_id=Item_List.Purchase_id WHERE Item_List.Purchase_id= ?', [a], function(err, rows) {
            if (err) {
                console.log(err);
            } else {
                var result_rows = JSON.stringify(rows);
                console.log(result_rows);
                res.send(result_rows);
            }
        });


    });


user_router.route('/user_view_rejected:key')
    .get(function(req, res) {
        var key_value = req.params.key;
        key_value = JSON.parse(key_value);
        var username = key_value.username;
        var token = key_value.token;
        if (verification.verify(token, username)) {

            conn.query('SELECT Purchase_id,Status,Created_date,Purchase_title from Purchase_Details WHERE Status="REJECTED" AND username=?', [username], function(err, rows) {
                if (err) {
                    console.log(err);
                } else {
                    // console.log(rows);
                    var result_rows = JSON.stringify(rows);
                    res.send(result_rows);
                }
            });



        }


    });

user_router.route('/resetpassword/:key')
    .put(function(req, res) {
    	 var oldpassword=req.body.oldPassword;
    	 var oldpassword=md5(oldpassword);
    	var newpassword=req.body.newPassword;
    	var newpassword=md5(newpassword);
    	var confirmpassword=req.body.confirmPassword;
    	var key_value = req.params.key;
        key_value = JSON.parse(key_value);
        var username = key_value.username;
        var token = key_value.token;
        var decoded = jwt.verify(token, 'jomyjose');

        console.log(oldpassword,newpassword);
       
        var post = { password:newpassword};
        var js={"status": '403' , "message" : "failed"};
    	 if (verification.verify(token, username)) {
    	
    	 	conn.query('UPDATE user SET ? WHERE password= ? AND username = ?', [post,oldpassword,decoded.username], function(err, result) {
                if(err) {
                    console.log(err);
                }

                else {
                    var data= JSON.stringify(result);
                    data=JSON.parse(data);
                    console.log(data);
                    if (data.affectedRows== 0) {
                        js= {"status":'403',"message":"failed"};
                        res.send(js);
                    }
                    else {
                        js.status='200';
                        js.message="success";
                        js.token=decoded;
                        res.send(js);
                    }
                   
                }
            })
           
    	 }
    	
    	
    });







module.exports = user_router;