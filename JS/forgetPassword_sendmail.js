var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var md5 = require('md5');
var jwt = require('jsonwebtoken');



var nodemailer = require('nodemailer');
var md5 = require('md5');

module.exports.sendMail = function(password,email,username,res) {
var js={"status":"","message":""}
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'bugtrackerndm@gmail.com', // Your email id
            pass: 'bugtracker' // Your password
        }
    });
    var token = jwt.sign({
                    username: username
                }, 'jomyjose', {
                    expiresIn: 60 * 10000
                });

    text = "http://192.168.1.230:8081/forget_password.html?"+token;
    var mailOptions = {
        from: 'bugtrackerndm@gmail.com',
        to: email,
        subject: 'purchase Request',
        html: text,
        text: text
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (!error) {
            console.log(info);
            js.status=200;
            js.message="success";
            res.send(js);
        }

    });
}