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
var main_router = express.Router();
var path = require('path');
var admin = require('./admin');
var user = require('./user');

app.set('views', path.join(__dirname, '..', 'HTML'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(__dirname + './../'));
app.use('/CSS', express.static(__dirname + './../CSS'));
app.get('/', function(req, res) {
    res.sendFile('login.html', {
        root: __dirname + '/../'
    });
});

var login = require('./logincheck.js');
main_router.post('/', login.loginCheck);
var adduser = require('./adduser.js');

var forgetPassword_sendmail = require('./forgetPassword_sendmail.js');
main_router.post('/password', function(request, res) {
    var username = request.body.user_name;
    var js = {
        "message": ""
    };
    if ((validator.isEmpty(username))) {
        js.message = "Username not found";
    } else {

        conn.query('select email from user where username=?', [username], function(err, rows) {
            if (err) {
                console.log(err);
            } else {
                if(rows.length>null){
                var pass = adduser.generatePassword();
                var passmd5 = md5(pass);
                var data = JSON.stringify(rows);
                var json = JSON.parse(data);
                console.log(json[0]);
                forgetPassword_sendmail.sendMails(pass, json[0].email,username,res);
        
       
                
            }
            else{
                js.message = "incorrect username";
                res.send(js);
            }
            }
            
        });
    }

});


main_router.put('/forget_password_reset',function(req,res){
   var url=req.body.url;
   var password_new=req.body.password_new;
     var decoded = jwt.verify(url, 'jomyjose');
       var username=decoded.username;
       console.log(username);
       conn.query('UPDATE user SET password=? WHERE username=?',[password_new,username], function(err, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log(rows);
                var result_rows = JSON.stringify(rows);
                res.send(result_rows);
            }
        });
});



main_router.route('/user_view_old')
    .get(function(req, res) {
        conn.query('SELECT Purchase_id,Status,Created_date,Purchase_title from Purchase_Details', function(err, rows) {
            if (err) {
                console.log(err);
            } else {
                // console.log(rows);
                var result_rows = JSON.stringify(rows);
                res.send(result_rows);
            }
        });

    });

app.use('/', admin);
app.use('/', main_router);
app.use('/', user);

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Listening at %s on port %s", host, port);
});