function client_script() {
    var httpObject = new XMLHttpRequest();
    httpObject.onreadystatechange = function() {

            console.log(this.readyState);
            if (this.readyState == '4' && this.status == '200') {
                var result = this.responseText;
                result = JSON.parse(result);


                content = "<div class='table table-responsive'><table class='table table-responsive table-hover' id='table1'><thead><tr><th>No.</th><th>Purchase Title</th><th>Status</th><th>Created date</th><th>Created Time</th><th>View More</th></tr></thead><tbody>";
                var i = 1;
                result.forEach(function(element) {
                    var date = new Date(element.Created_date);
                    var time = date.toLocaleTimeString();
                    date = date.toISOString().split('T')[0]
                    date = toDate2(date);
                    if (element.Status == "approved") {
                        content += "<tr style='background-color:#D2EACB;'><td >" + i + "</td><td>" + element.Purchase_title + "</td><td>" + element.Status + "</td><td>" + date + "</td><td>" + time + "</td><td>" + "<button id='viewmore' class='btn-info' onclick='displayItem(" + element.Purchase_id + ");'>View More</button>" + "</td></tr>";

                    } else {
                        content += "<tr ><td >" + i + "</td><td>" + element.Purchase_title + "</td><td>" + element.Status + "</td><td>" + date + "</td><td>" + time + "</td><td>" + "<button id='viewmore' class='btn-info' onclick='displayItem(" + element.Purchase_id + ");'>View More</button>" + "</td></tr>";

                    }
                    i++;
                });
                content += "</tbody> </table> </div>";
                document.getElementById('display_purchase_details').innerHTML = content;
                $('#table1').DataTable();
            }
        }
        //PASSING USER NAME
    var username = localStorage.getItem('USERNAME');
    var token = localStorage.getItem('TOKEN');
    document.getElementById('welcome_username').innerHTML = username;
    console.log(username, token);
    var key = {
        'username': username,
        'token': token
    };
    key = JSON.stringify(key);
    httpObject.open('GET', 'http://192.168.1.230:8081/user_view_all' + key, true);
    httpObject.setRequestHeader('content-type', 'application/json');
    httpObject.send();
}

function displayItem(id) {
    // console.log("Inside displayItem");
    // document.location.href = "user_home_viewall-more.html";

    var con = client_script2(id);
    // console.log(client_script2());
    console.log(con);
    localStorage.setItem("pid", id);

    return false;



}


function client_script2(id) {
    var get_purchase_id = id;
    console.log(get_purchase_id);
    var httpObject = new XMLHttpRequest();
    //THIS IS TO PASS THIS VAR TO NEXT PAGE TO GET THE PURCHASE DETAILS
    httpObject.onreadystatechange = function() {
        console.log(this.readyState);
        //document.getElementById("result").innerHTML=this.status;
        if (this.readyState == '4' && this.status == '200') {
            var result = this.responseText;
            result = JSON.parse(result);
            content = "<form><div class='table table-responsive'><table class='table table-hover table-responsive panel panel-default' id='table1'><thead><tr><th>No.</th><th>Item Name</th><th>Item Description</th><th>Quantity</th></tr></thead><tbody>";
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
            document.getElementById("status").innerHTML = result[0].Status;
            console.log(result.Purchase_title);
            result.forEach(function(element) {
                console.log(content);
                content += "<tr><td>" + i + "</td><td>" + element.Item_name + "</td><td>  <a href='#' data-toggle='popover' title='Item Description' data-content='" + element.Item_description + "'>Item Description</a></td><td>" + element.Quantity + "</td></tr>";
                i++;
            });
            // AT THE END I HAVE THE SAVE BUTTON
            content += "</tbody> </table> </div></form>";
            //document.getElementById('Item_List_data').innerHTML = content;
            $('#modalTitle').html(
                "Purpose:" +
                title
            );
            //$('#modalTitle').html(event.title);
            $('#modalBody').html((content));

            $('#fullCalModal').modal({
                backdrop: "static"
            });
            $(document).ready(function() {

                $('[data-toggle="popover"]').popover();
            });
        }
    }

    var username = localStorage.getItem('USERNAME');
    var token = localStorage.getItem('TOKEN');
    document.getElementById('welcome_username').innerHTML = username;
    httpObject.open('POST', 'http://192.168.1.230:8081/user_view_all-more', true);
    httpObject.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    httpObject.send("pid=" + get_purchase_id);
}