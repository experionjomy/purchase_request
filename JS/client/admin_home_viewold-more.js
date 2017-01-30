function client_script() {
    var get_purchase_id = localStorage.getItem("pid");
    var username = localStorage.getItem('USERNAME');
    var token = localStorage.getItem('TOKEN');
    var httpObject = new XMLHttpRequest();
    //THIS IS TO PASS THIS VAR TO NEXT PAGE TO GET THE PURCHASE DETAILS

    httpObject.onreadystatechange = function() {

            console.log(this.readyState);
            //document.getElementById("result").innerHTML=this.status;

            if (this.readyState == '4' && this.status == '200') {
                var result = this.responseText;
                result = JSON.parse(result);
                //console.log(result[0].Purchase_title);
                content = "<form><div class='table'><table class='table table-responsive' id='table1'><thead><tr><th>No.</th><th>Item Name</th><th>Item Description</th><th>Quantity</th></tr></thead><tbody>";
                var i = 1;
                document.getElementById("purchase_title").innerHTML = result[0].Purchase_title;
                document.getElementById("related_project").innerHTML = result[0].Related_project;
                document.getElementById("priority").innerHTML = result[0].Priority;
                var date=new Date(result[0].Created_date);
                date=date.toISOString().split('T')[0]
                date = toDate2(date);
                document.getElementById("created_date").innerHTML = date;
                document.getElementById("status").innerHTML = result[0].Status;
                document.getElementById("owner").innerHTML = result[0].username;
                // console.log(result.Purchase_title);
                result.forEach(function(element) {

                    console.log(content);
                    content += "<tr><td>" + i + "</td><td>" + element.Item_name + "</td><td>" + element.Item_description + "</td><td>" + element.Quantity + "</td></tr>";
                    i++;
                });
                // AT THE END I HAVE THE SAVE BUTTON
                content += "</tbody> </table> </div></form>";
                document.getElementById('Item_List_data').innerHTML = content;
                        $('#table1').DataTable();
 
    
            }

        }
        var key={'username':username,'token':token};
         key=JSON.stringify(key);
             document.getElementById('welcome_username').innerHTML=username;
    httpObject.open('POST', 'http://192.168.1.230:8081/admin_view_all-more', true);
    httpObject.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    httpObject.send("pid=" + get_purchase_id);
}
function toDate2(str) {
  // var str = moment(str).add(1, 'day');
   var from = str.split("-");
   
   var str=from[2]+"-"+ from[1] +"-"+ from[0];
   return (str);
}