var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var md5 = require('md5');
var conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "jomyjose",
    database: "PurchaseRequest"
});
var app = express();
var validator = require('validator');
var nodemailer = require('nodemailer');
//var conn=require('./database.js');
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var admin_router = express.Router();
var path = require('path');
var verification = require('./verify.js');
var adduser = require('./adduser.js');



admin_router.route('/admin_view_all/:key')
    .get(function(req, res) {
        var key_value = req.params.key;
        key_value = JSON.parse(key_value);
        console.log("token" + key_value.token);
        // var data = req.body;
        var username = key_value.username;
        var token = key_value.token;
        if (key_value.token == "") {
            console.log("invalid user");
        } else {
            if (verification.verify(token, username)) {
                conn.query('SELECT Purchase_id,username,Status,Created_date,Purchase_title from Purchase_Details WHERE Status="PENDING"', function(err, rows) {
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


var update_rejection_reason = require('./update_rejection_reason.js');
admin_router.route('/rejection_reason_update')
    .post(function(req, res) {
        var reason_array = req.body;
        console.log("inside login" + reason_array);
        update_rejection_reason.Enter_Reason(reason_array);
    });

var update_purchasedata_status = require('./update_purchasedata_status.js');
admin_router.route('/update_purchasedata')
    .post(function(req, res) {
        var status_update_array = req.body;
        update_purchasedata_status.Update_Status(status_update_array, res);

    });

admin_router.route('/admin_view_old/:key')
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
                conn.query('SELECT Purchase_id,username,Status,Created_date,Purchase_title from Purchase_Details', function(err, rows) {
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

admin_router.route('/admin_view_all-more')
    .post(function(req, res) {
        var a = req.body.pid;
        console.log(a);

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

admin_router.route('/adduser/:key')
    .post(function(req, res) {
        var userName = req.body.username;
        var userName = userName.replace(/\s/g, "");
        var email = req.body.email;
        console.log(userName, email);
        var password = adduser.generatePassword();
        var p_word = md5(password).toString();
        console.log(password, p_word);
        var key_value = req.params.key;
        key_value = JSON.parse(key_value);
        console.log("token" + key_value.token);
        var username = key_value.username;
        var token = key_value.token;
        if (key_value.token == "") {
            console.log("invalid user");
        } else {
            if (verification.verify(token, username)) {
                conn.query("insert into user (username,email,password) values ('" + userName + "','" + email + "','" + p_word + "')", function(err, rows) {
                    if (err) {
                        console.log(err);
                    } else {
                        adduser.sendMail(email, userName, password);
                        var result_rows = JSON.stringify(rows);
                        console.log(result_rows);
                        res.send(result_rows);
                    }
                });
            }
        }

    });
module.exports = admin_router;