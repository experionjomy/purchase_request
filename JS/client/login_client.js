function validation() {
    var user_name = escape(document.getElementById("user_name").value);
    var password = document.getElementById("password").value;
    if (user_name == "" || password == "") {
        bootbox.alert("fields cannot be empty", function() {
            location.reload();
        });
    } else {
        validate(user_name, password);
    }
}

function validate(username, password) {
    var password = (Crypto.MD5(document.getElementById('password').value)).toString();
    var httpObject = new XMLHttpRequest();
    httpObject.onreadystatechange = function() {
        document.getElementById("printResult").innerHTML = this.readyState;
        if (this.readyState == '4' && this.status == '200') {
            var result = this.responseText;
            result = JSON.parse(result);
            if (result.status == 200) {
                if (result.userType == "User") {
                    console.log(result);
                    document.getElementById("printResult").innerHTML = result.message;
                    document.location.href = "user_home.html";
                    var set_username = result.username;
                    var set_token = result.token;
                    console.log(set_username, set_token);
                    localStorage.setItem('TOKEN', set_token);
                    localStorage.setItem('USERNAME', set_username);
                } else if (result.userType == "Admin") {
                    console.log(result.message);
                    document.getElementById("printResult").innerHTML = result.message;
                    document.location.href = "admin_home_viewall.html";
                    var set_username = result.username;
                    var set_token = result.token;
                    localStorage.setItem('TOKEN', set_token);
                    localStorage.setItem('USERNAME', set_username);
                } else {
                    window.location.reload();
                }
            } else {
                console.log(result.message);
                document.getElementById("printResult").innerHTML = result.message;
            }
        }
    }
    httpObject.open('POST', 'http://192.168.1.230:8081', true);
    httpObject.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    httpObject.send('eid=' + username + '&password=' + password);
}


$(function() {

    if (localStorage.chkbx && localStorage.chkbx != '') {
        $('#remember_me').attr('checked', 'checked');
        $('#user_name').val(localStorage.username);
        $('#password').val(localStorage.pass);
    } else {
        $('#remember_me').removeAttr('checked');
        $('#user_name').val('');
        $('#password').val('');
    }

    $('#remember_me').click(function() {

        if ($('#remember_me').is(':checked')) {
            // save username and password
            localStorage.username = $('#user_name').val();
            localStorage.pass = $('#password').val();
            localStorage.chkbx = $('#remember_me').val();
        } else {
            localStorage.username = '';
            localStorage.pass = '';
            localStorage.chkbx = '';
        }
    });
});