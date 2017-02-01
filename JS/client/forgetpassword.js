$(document).ready(function() {
    $('#forget_password').click(function() {
        bootbox.confirm({
            size: "small",
            message: "Reset password with email",
            callback: function(result) {
                if (result == true) {
                    bootbox.prompt({
                        size: "small",
                        title: "Enter username",
                        callback: function(result) {
                        console.log(result);
                        if(result==null)
                        {
                            return;
                        }
                            var username = escape(result);
                            if (username == "") bootbox.alert("enter username");
                            else {
                                var httpObj1 = new XMLHttpRequest();
                                httpObj1.onreadystatechange = function() {
                                    if (this.readyState == '4' && this.status == '200') {
                                        var result=this.responseText;
                                        result=JSON.parse(result);
                                        bootbox.alert(result);
                                        

                                    }
                                    else{
                                        bootbox.alert(result);
                                    }
                                };
                                httpObj1.open('POST', 'http://192.168.1.230:8081/password', true);
                                httpObj1.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                                httpObj1.send('user_name=' + username);
                            }
                       
                   }
                    });

                } else {
                    window.location.reload();
                }
            }
        });
    });
});