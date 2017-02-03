var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var md5 = require('md5');
var jwt = require('jsonwebtoken');



var nodemailer = require('nodemailer');
var md5 = require('md5');
var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'purchaserequest3009@gmail.com', // Your email id
            pass: '123456!@#' // Your password
        }
    });

module.exports.sendMails = function(password,email,username,res) {
    console.log("inside sendMails");
var js={"status":"","message":""}
    
    var token = jwt.sign({
                    username: username
                }, 'jomyjose', {
                    expiresIn: 86400
                });

    text = "http://192.168.1.230:8081/forget_password.html?"+token;
    var mailOptions = {
        from: 'purchaserequest3009@gmail.com',
        to: email,
        subject: 'purchase Request',
        html: text,
        text: text
    };

    transporter.sendMail(mailOptions,function(error, info) {
        console.log("inside transporter");
        if (!error) {
            console.log(info);
            js.status=200;
            js.message="success";
            res.send(js);
        }else{
            console.log(error);
        }

    });
}