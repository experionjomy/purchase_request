var nodemailer = require('nodemailer');
var md5 = require('md5');
module.exports.sendMail = function(email, userName, password) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'bugtrackerndm@gmail.com', // Your email id
            pass: 'bugtracker' // Your password
        }
    });
    text = "Your username and password is successfully generated.Username is " + userName + '  password is ' + password;
    var mailOptions = {
        from: 'bugtrackerndm@gmail.com',
        to: email,
        subject: 'purchase Request',
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (!error) {
            console.log(info);
        }

    });

}
module.exports.generatePassword = function() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$&%",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }

    return retVal;

}