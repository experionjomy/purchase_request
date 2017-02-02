var status_array = [];

function storeData(element, reasons) {
    var table = document.getElementById("table1");
    var length = table1.rows.length;
    for (var i = 0; i < length - 1; i++) {

        var status_demo = {
            purchase_id: "",
            status_of_item: ""
        };
        status_demo.purchase_id = element[i];
        console.log(element[i]);
        var a = document.getElementById("save_status" + element[i]).value;
        status_demo.status_of_item = document.getElementById("save_status" + element[i]).value;
        status_array.push(status_demo);
        console.log(status_array);
    };
    storeReason(reasons);
    var httpObject = new XMLHttpRequest();
    httpObject.onreadystatechange = function() {


        if (this.readyState == '4' && this.status == '200') {
            var result = this.responseText;
            result = JSON.parse(result);
            if (result.message == "success") {
                bootbox.alert("Successfully saved status",function(){
                    window.location.reload();
                });
                
            }
        }
    }

    httpObject.open('POST', 'http://192.168.1.230:8081/update_purchasedata', true);
    httpObject.setRequestHeader('content-type', 'application/json');
    httpObject.send(JSON.stringify(status_array));

}


//----------------------------------------------------------------------------------------------------------------------------------


var reason_array = [];

function storeReason(reasons) {
    var length = reasons.length;
    for (var i = 0; i < length; i++) {
        var reason_demo = {
            purchase_id: "",
            reason_for_rejection: ""
        };
        reason_demo.purchase_id = reasons[i];
        reason_demo.reason_for_rejection = document.getElementById("reason" + reasons[i]).value;
        reason_array.push(reason_demo);
        console.log(reason_array);
    };
    var httpObject1 = new XMLHttpRequest();
    httpObject1.onreadystatechange = function() {
        if (this.readyState == '4' && this.status == '200') {}
    }

    httpObject1.open('PUT', 'http://192.168.1.230:8081/rejection_reason_update', true);
    httpObject1.setRequestHeader('content-type', 'application/json');
    httpObject1.send(JSON.stringify(reason_array));
}




//-------------------------------------------------------------------------------------------------------------------------------

function displayItem(id) {
   /// window.location.assign("admin_home_viewall-more.html");
    var con=client_script2(id);
    localStorage.setItem("pid", id);
console.log(con);
    
     
    return false;
}


function client_script() {

    var username = localStorage.getItem('USERNAME');
    var token = localStorage.getItem('TOKEN');
    var httpObject = new XMLHttpRequest();
    //THIS IS TO PASS THIS VAR TO NEXT PAGE TO GET THE PURCHASE DETAILS
    httpObject.onreadystatechange = function() {

        console.log(this.readyState);
        //document.getElementById("result").innerHTML=this.status;
        purchase_id = [];
        rejection_reason = [];
        if (this.readyState == '4' && this.status == '200') {
            var result = this.responseText;
            result = JSON.parse(result);
            //  console.log(result[0]);

            content = "<form id='myform'><div class='table-responsive'><table class='table table-responsive' id='table1'><thead><tr><th>No.</th><th>Raised By:</th><th>Received Date</th><th>Received Time</th><th>Purchase Title</th><th>Priority</th><th>View More</th><th>Action</th></tr></thead><tbody>";
            var i = 1;
            result.forEach(function(element) {
                //  console.log(content);
                var date = new Date(element.Created_date);
                var time = date.toLocaleTimeString();
                date = date.toISOString().split('T')[0]
                date = toDate2(date);
                if (element.Priority == "Critical") {
                content += "<tr><td>" + i + "</td><td>" + element.username + "</td><td>" + date + "</td><td>" + time + "</td><td>" + element.Purchase_title + "</td><td><span class='glyphicon glyphicon-exclamation-sign'></span>"+element.Priority+"</td><td><button class='viewmore btn btn-info' onclick='return displayItem(" + element.Purchase_id + ");'>VIEW MORE</button></td><td><select class='select_action form-control' id='save_status" + element.Purchase_id + "' onchange='displayBox(this.value," + element.Purchase_id + ",rejection_reason);'>" + "<option value='pending'>pending</option><option value='approved'>approved</option><option value='rejected'>rejected</option></select><input class='form-control' type='textbox' id='reason" + element.Purchase_id + "' placeholder='Enter Reason' style='visibility:hidden;'/></td></tr>";
                }
                else{
                content += "<tr><td>" + i + "</td><td>" + element.username + "</td><td>" + date + "</td><td>" + time + "</td><td>" + element.Purchase_title + "</td><td>"+element.Priority+"</td><td><button class='viewmore btn btn-info' onclick='return displayItem(" + element.Purchase_id + ");'>VIEW MORE</button></td><td><select class='select_action form-control' id='save_status" + element.Purchase_id + "' onchange='displayBox(this.value," + element.Purchase_id + ",rejection_reason);'>" + "<option value='pending'>pending</option><option value='approved'>approved</option><option value='rejected'>rejected</option></select><input class='form-control' type='textbox' id='reason" + element.Purchase_id + "' placeholder='Enter Reason' style='visibility:hidden;'/></td></tr>";
                }
                purchase_id.push(element.Purchase_id);
                localStorage.setItem("pid", element.Purchase_id);
                i++;
            });
            // AT THE END I HAVE THE SAVE BUTTON
            content += "</tbody> </table><button type='button' class='btn btn-success' data-toggle='modal' data-target='#myModal' onclick='storeData(purchase_id,rejection_reason); '> SAVE </button> </div></form>";
            document.getElementById('display_purchase_details').innerHTML = content;

            $('#table1').DataTable();
        }
    }
    var key = {
        'username': username,
        'token': token
    };
    document.getElementById('welcome_username').innerHTML = username;
    key = JSON.stringify(key);
    httpObject.open('GET', 'http://192.168.1.230:8081/admin_view_all/' + key, true);
    httpObject.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    httpObject.send();
}


function displayBox(value, id) {
    console.log(id);
    if (value == 'rejected') {
        //cument.getElementById("alert").style.visibility = 'visible';
        document.getElementById("reason" + id).style.visibility = 'visible';
        rejection_reason.push(id);
        console.log(rejection_reason);

    } else {
        document.getElementById("reason" + id).style.visibility = 'hidden';
    };
    return rejection_reason;
}

function toDate2(str) {
    // var str = moment(str).add(1, 'day');
    var from = str.split("-");
    var str = from[2] + "-" + from[1] + "-" + from[0];
    return (str);
}



function client_script2(id) {
    var get_purchase_id = id;
    var username = localStorage.getItem('USERNAME');
    var token = localStorage.getItem('TOKEN');
    console.log(get_purchase_id);
    var httpObject = new XMLHttpRequest();
    //THIS IS TO PASS THIS VAR TO NEXT PAGE TO GET THE PURCHASE DETAILS
    httpObject.onreadystatechange = function() {
        console.log(this.readyState);
        //document.getElementById("result").innerHTML=this.status;
        if (this.readyState == '4' && this.status == '200') {
            var result = this.responseText;
            result = JSON.parse(result);
            //console.log(result[0].Purchase_title);
            content = "<form><div class='table-responsive'><table class='table table-responsive' id='table1'><thead><tr><th>No.</th><th>Item Name</th><th>Item Description</th><th>Quantity</th></tr></thead><tbody>";
            var i = 1;
            // document.getElementById("purchase_title").innerHTML = result[0].Purchase_title;
            var title = result[0].Purchase_title;
            document.getElementById("related_project").innerHTML = result[0].Related_project;
            document.getElementById("priority").innerHTML = result[0].Priority;
            var date = new Date(result[0].Created_date);
            var time = date.toLocaleTimeString();
            date = date.toISOString().split('T')[0]
            date = toDate2(date);
            document.getElementById("created_date").innerHTML = date;
              document.getElementById("created_time").innerHTML = time;
            document.getElementById("status").innerHTML = result[0].Status;
            document.getElementById("owner").innerHTML = result[0].username;
            console.log(result.Purchase_title);

            result.forEach(function(element) {
                console.log(content);
                content += "<tr><td>" + i + "</td><td>" + element.Item_name + "</td><td>  <a href='#' data-toggle='popover' title='Item Description' data-content='"+element.Item_description+"'>Item Description</a></td><td>" + element.Quantity + "</td></tr>";
                i++;
            });

            content += "</tbody> </table> </div></form>";
            $('#modalTitle').html(
               "Purpose:"+
               title
                  );
            //$('#modalTitle').html(event.title);
           $('#modalBody').html((content));
          
            $('#fullCalModal').modal({backdrop:"static"});
             $(document).ready(function(){
                $('[data-toggle="popover"]').popover(); 
            });
            // document.getElementById('Item_List_data').innerHTML = content;
            //$('#table1').DataTable();
        }
    }
    var key = {
        'username': username,
        'token': token
    };
    key = JSON.stringify(key);
    document.getElementById('welcome_username').innerHTML = username;
    httpObject.open('POST', 'http://192.168.1.230:8081/admin_view_all-more', true);
    httpObject.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    httpObject.send("pid=" + get_purchase_id);
}
