   function addUser() {
       var username = localStorage.getItem('USERNAME');
       var token = localStorage.getItem('TOKEN');
       var uname = document.getElementById("uname").value;
       var email = document.getElementById("mail").value;
       var matching = email.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);
       if (uname == "" || email == "") {
           bootbox.alert("Input fields cannot be empty");
           return false;
       } else if (matching == null) {
           bootbox.alert("Invalid email");
           document.getElementById("uname").value = "";
           document.getElementById("mail").value = "";
           return false;
       } else {
           var httpObject = new XMLHttpRequest();
           httpObject.onreadystatechange = function() {
               var result = this.responseText;
               result = JSON.parse(result);
               if (result.status == 200) {
                   bootbox.alert("User added successfully", function() {
                       location.reload();
                   });
               } else {
                   bootbox.alert("Cannot add user");
               }
           }
           var key = {
               'username': username,
               'token': token
           };
           key = JSON.stringify(key);

           httpObject.open('POST', 'http://192.168.1.230:8081/adduser/' + key, true);
           httpObject.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
           httpObject.send('username=' + uname + '&email=' + email);
           return false;
       }
   }