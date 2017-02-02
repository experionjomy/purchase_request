function client_script() {

    var username = localStorage.getItem('USERNAME');
    var token = localStorage.getItem('TOKEN');
    var httpObject = new XMLHttpRequest();
    httpObject.onreadystatechange = function() {
        console.log(this.readyState);
        if (this.readyState == '4' && this.status == '200') {

            var result = this.responseText;
            result = JSON.parse(result);
            content = "<form><div class='table-responsive'><table class='table' id='table1'><thead><tr><th>No.</th><th>Received Date</th><th>Received Time</th><th>Purchase Title</th><th>Raised By</th><th>View More</th></tr></thead><tbody>";
            var i = 1;
            result.forEach(function(element) {

                var date = new Date(element.Created_date);
                var time = date.toLocaleTimeString();
                date = date.toISOString().split('T')[0]
                date = toDate2(date);
                 if (element.Status == "rejected") {
                    content += "<tr style='background-color:biege;'><td>" + i + "</td><td>" + date + "</td><td>" + time + "</td><td>" + element.Purchase_title + "</td><td>" + element.username + "</td><td><button class='btn btn-info' onclick='return displayItem(" + element.Purchase_id + ");'>VIEW MORE</button></td></tr>";
                 }
                 else{
                content += "<tr style='background-color:#D2EACB;'><td>" + i + "</td><td>" + date + "</td><td>" + time + "</td><td>" + element.Purchase_title + "</td><td>" + element.username + "</td><td><button class='btn btn-info' onclick='return displayItem(" + element.Purchase_id + ");'>VIEW MORE</button></td></tr>";
                }
                i++;
            });
            // AT THE END I HAVE THE SAVE BUTTON
            content += "</tbody> </table> </div></form>";
            document.getElementById('display_purchase_details_old').innerHTML = content;
            $('#table1').DataTable();

        }
    }
    var key = {
        'username': username,
        'token': token
    };
    key = JSON.stringify(key);
    document.getElementById('welcome_username').innerHTML = username;
    httpObject.open('GET', 'http://192.168.1.230:8081/admin_view_old/' + key, true);
    httpObject.setRequestHeader('content-type', 'application/json');
    httpObject.send();
}

function displayItem(id) {
    //window.location.assign("admin_home_viewold-more.html");
   var con=client_script2(id);
  // console.log(client_script2());
   console.log(con);
    localStorage.setItem("pid", id);
     
    return false;
}
function client_script2(id) {
    console.log(id);
    var content;
    var get_purchase_id = id;
    var username = localStorage.getItem('USERNAME');
    var token = localStorage.getItem('TOKEN');
    var httpObject = new XMLHttpRequest();
    console.log("234");
    //THIS IS TO PASS THIS VAR TO NEXT PAGE TO GET THE PURCHASE DETAILS

    httpObject.onreadystatechange = function() {
        console.log(this.readyState);
        if (this.readyState == '4' && this.status == '200') {
            var result = this.responseText;
            result = JSON.parse(result);
            console.log(result);
            content = "<form><div class='table'><table class='table table-responsive' id='table1'><thead><tr><th>No.</th><th>Item Name</th><th>Item Description</th><th>Quantity</th></tr></thead><tbody>";
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
            result.forEach(function(element) {
                console.log(content);
                content += "<tr><td>" + i + "</td><td>" + element.Item_name + "</td><td>  <a href='#' data-toggle='popover' title='Item Description' data-content='"+element.Item_description+"'>Item Description</a></td><td>" + element.Quantity + "</td></tr>";
                i++;
            });
            // AT THE END I HAVE THE SAVE BUTTON
            content += "</tbody> </table> </div></form>";
            console.log(content);
             //return  content;

             $('#modalTitle').html(
               "Purpose:"+ title
               
                  );
            //$('#modalTitle').html(event.title);
           $('#modalBody').html((content));
           $(document).ready(function(){
                $('[data-toggle="popover"]').popover(); 
            });
            $('#fullCalModal').modal({backdrop:"static"});
           // document.getElementById('Item_List_data').innerHTML = content;
            //$('#table1').DataTable();
        }
    }
    console.log(content,"con");
    var key = {
        'username': username,
        'token': token
    };
    key = JSON.stringify(key);
    document.getElementById('welcome_username').innerHTML = username;
    httpObject.open('POST', 'http://192.168.1.230:8081/admin_view_all-more', true);
    httpObject.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    httpObject.send("pid=" + get_purchase_id);

    //return  content;
}
