var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var cors = require('cors');
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "jomyjose",
    database: "PurchaseRequest"
});
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var c;
var mail = 0;
var main_router = express.Router();
var js = {
    "message": "success"
}


module.exports.Update_Status = function(status_update_array, res) {
    c = 0;
    // for (var i = 0; i < status_update_array.length; i++){
    status_update_array.forEach(function(element) {
            if (element.status_of_item == 'approved') {
                c++;
                console.log(c);
                
            }
            conn.query('UPDATE Purchase_Details SET Status= ? WHERE Purchase_id= ?', [element.status_of_item, element.purchase_id], function(err, rows) {
                
                if (err) {
                    console.log(err);
                     js.message = "failed";
                
                } else {
                   
                }
            });
        })
        // }
    for (var i = 0; i < c; i++) {
        conn.query('SELECT user.username,email,Purchase_id, Created_date ,Purchase_title FROM Purchase_Details INNER JOIN user WHERE user.username=Purchase_Details.username AND Purchase_id=? AND Status="approved" ', [status_update_array[i].purchase_id], function(err, rows) {
            if (err) {
                console.log(err); js.message = 'failed';
            } else {
                rows = JSON.stringify(rows);
                rows = JSON.parse(rows);
                sendMail(rows[0], res, c);
            }
        });
    }
    console.log(js);
    res.send(js);

}
var sendMail = function(rows, res, c) {
    mail++;
    console.log(rows.email);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'bugtrackerndm@gmail.com', // Your email id
            pass: 'bugtracker' // Your password
        }
    });
    text = "Your " + rows.Purchase_title + " made on " + rows.Created_date + " has been approved";
    var mailOptions = {
        from: 'bugtrackerndm@gmail.com',
        to: rows.email,
        subject: 'purchase Request',
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (!error) {
            console.log(info);
        } else {
            if (mail == c) {
                mail = 0;

            }
        }
    });
}