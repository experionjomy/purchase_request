function addUser() {
    var uname = document.getElementById("uname").value;
    var email = document.getElementById("mail").value;
    console.log(uname);
    console.log(email);
    var httpObject = new XMLHttpRequest();
    httpObject.onreadystatechange = function() {
    }

    var username = localStorage.getItem('USERNAME');
    var token = localStorage.getItem('TOKEN');
    document.getElementById('welcome_username').innerHTML = username;
    console.log(username, token);
    var key = {
        'username': username,
        'token': token
    };
    key = JSON.stringify(key);
    httpObject.open('POST', 'http://192.168.1.230:8081/adduser/' + key, true);
    httpObject.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    httpObject.send('username=' + uname + '&email=' + email);
}


function logout() {
    if (confirm("Are you sure?")) {
        localStorage.clear();
        window.location = "login.html";
    } else {
        return false;
    }
}

function verify() {
    username = localStorage.getItem('USERNAME');
    console.log(username);
    if (username == null) {

        document.location.href = "login.html";
    }
}
// function validate(){
//     var uname = document.getElementById("uname").value;
//     var email = document.getElementById("mail").value;
//     if(uname==""&&email==""){
//       alert("Empty fields");
//       return false;
//     }

// }