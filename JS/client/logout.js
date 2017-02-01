function logout() {
    bootbox.confirm({
        message: "Are you sure?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function(result) {
            if (result) {
            	//localStorage.clear();
                localStorage.removeItem('TOKEN');
                localStorage.removeItem('USERNAME');
                window.location = "login.html";
            }
        }
    });
}

function verify() {
    username = localStorage.getItem('USERNAME');
    document.getElementById('welcome_username').innerHTML = username;
    if (username == null) {
        document.location.href = "login.html";
    }
}

function toDate2(str) {
    var from = str.split("-");
    var str = from[2] + "-" + from[1] + "-" + from[0];
    return (str);
}
