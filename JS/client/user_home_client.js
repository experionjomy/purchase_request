 username = localStorage.getItem('USERNAME');
 // document.getElementById('welcome_username').innerHTML = username;
 if (username == null) {
     document.location.href = "login.html";
 }

 var count = 0;
 $(document).ready(function() {
     $('#change_password').click(function() {
         $('#reset_data').toggle();
     });
 });


 function verify() {
     username = localStorage.getItem('USERNAME');
     console.log(username);
     if (username == null) {
         document.location.href = "login.html";
     }
 }

 function sendData() {
     var httpObject = new XMLHttpRequest();
     httpObject.onreadystatechange = function() {
         if (this.readyState == '4' && this.status == '200') {
             console.log("Server Connected!!");
             var result = this.responseText;
             result = JSON.parse(result);
             if (result.status == 200) {
                 console.log(result);
                 bootbox.alert("Request Send successfully!!", function() {
                     location.reload();
                 });
             } else {
                 bootbox.alert("Request Cannot be sent!!", function() {
                     location.reload();
                 });

             }
         }

     }

     var table = document.getElementById("itemTable");
     var item_object = {
         purchase_title_p: "",
         assigned_to_p: "",
         related_project_p: "",
         priority_p: "",
         item_category_p: "",
         items: []
     };
     item_object.purchase_title_p = document.getElementById('purchase_title').value;
     item_object.assigned_to_p = document.getElementById('assigned_to').value;
     item_object.related_project_p = document.getElementById('related_project').value;
     item_object.priority_p = document.getElementById('priority').value;
     item_object.item_category_p = document.getElementById('item_category').value;
     for (var i = 1; row = table.rows[i]; i++) {
         row = table.rows[i];
         var itemdemo = {
             itemname: "",
             description: "",
             quantity: ""
         };
         var arr = [];
         for (var j = 0; col = row.cells[j]; j++) {
             arr[j] = col.firstChild.value;
         }
         itemdemo.itemname = arr[0];
         itemdemo.description = arr[1];
         itemdemo.quantity = arr[2];
         item_object.items.push(itemdemo);
         if (!arrayValidate(arr, item_object.purchase_title_p)) {
             return false;
         }

     }

     var key = {
         'username': username,
         'token': token
     };
     key = JSON.stringify(key);
     httpObject.open('POST', 'http://192.168.1.230:8081/enter_purchasedata/' + key, true);
     httpObject.setRequestHeader('content-type', 'application/json');
     httpObject.send(JSON.stringify(item_object));
     return false;
 }



 function arrayValidate(arr, title) {

     var rejex = /^[a-zA-Z\s]+$/;
     if (rejex.test(title) && title.length < 2) {
         bootbox.alert("Invalid Purchase title");
         return false;
     }

     if (arr[0].length < 1) {
         bootbox.alert("invalid Item name");
         return false;
     }
     if (arr[1].length < 5 || !isNaN(arr[1])) {
         bootbox.alert("invalid Item description");
         return false;
     }
     if (arr[2].length < 1 || isNaN(arr[2])) {
         bootbox.alert("invalid quantity");
         return false;
     }
     return true;
 }

 function addItem() {
     count++;
     var table = document.getElementById("itemTable");
     var length = table.rows.length;
     var row = table.insertRow(length);
     var elementId = "c" + length;
     var cell1 = row.insertCell(0);
     var cell2 = row.insertCell(1);
     var cell3 = row.insertCell(2);
     var cell4 = row.insertCell(3);

     var input1 = document.createElement("input");
     var input2 = document.createElement("input");
     var input3 = document.createElement("input");
     var input4 = document.createElement("button");
     cell1.appendChild(input1);
     input1.style.width = "90%";
     input1.setAttribute("class", elementId + "1" + "col-sm-2 form-control");
     input1.setAttribute("placeholder", "Enter item name");
     console.log(elementId + "1");
     cell2.appendChild(input2);
     input2.style.width = "90%";
     input2.setAttribute("id", elementId + "2");
     input2.setAttribute("class", elementId + "1" + "col-sm-2 form-control");
     input2.setAttribute("placeholder", "Enter item description");
     console.log(elementId + "2");
     cell3.appendChild(input3);
     input3.setAttribute("class", elementId + "1" + "col-sm-2 form-control");
     input3.style.width = "90%";
     input3.setAttribute("id", elementId + "3");
     input3.setAttribute("placeholder", "Enter quantity")
     cell4.appendChild(input4);
     input4.style.width = "90%";
     input4.setAttribute("id", "delete");
     input4.setAttribute("class", elementId + "1" + "col-sm-2 btn btn-danger glyphicon glyphicon-remove");
     input4.type = "button";
     input4.onclick = function() {
         count--;
         if (count < 1) {
             bootbox.alert("There should be atleast one item in the request");
             count++;
             return false;
         }
         // this.parentNode.parentNode.removeChild(this);

         this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
         bootbox.alert("You had removed an item from list");
     };
     input4.innerHTML = "delete";
 }