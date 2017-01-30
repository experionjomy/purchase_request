
function client_script(){

var username=localStorage.getItem('USERNAME');
var token=localStorage.getItem('TOKEN');
var httpObject=new XMLHttpRequest();
            httpObject.onreadystatechange=function()
            {
                    console.log(this.readyState);
                    if(this.readyState=='4' && this.status=='200')
                    {
                        var result=this.responseText;
                        result=JSON.parse(result);
                        console.log("ALL REQ!!");

                        content = "<form><div class='table-responsive'><table class='table' id='table1'><thead><tr><th>No.</th><th>Received Date</th><th>Purchase Title</th><th>Owned By</th><th>Status</th><th>View More</th></tr></thead><tbody>";
                        var i = 1;
        
                        result.forEach(function(element) {
          //  console.log(content);
            var date=new Date(element.Created_date);
            date=date.toISOString().split('T')[0]
            date = toDate2(date);
                        content += "<tr><td>" + i + "</td><td>" + date + "</td><td>" + element.Purchase_title + "</td><td>"+element.username+"</td><td>"+element.Status+"</td><td><button class='btn btn-info' onclick='return displayItem("+element.Purchase_id+");'>VIEW MORE</button></td></tr>"  ;
                        i++
                        
                        });

        // AT THE END I HAVE THE SAVE BUTTON
                        content += "</tbody> </table> </div></form>";
                    
                            document.getElementById('display_purchase_details_old').innerHTML = content;
                     $('#table1').DataTable();
                    }

            }
                 var key={'username':username,'token':token};
         key=JSON.stringify(key);
document.getElementById('welcome_username').innerHTML=username;
        httpObject.open('GET','http://192.168.1.230:8081/admin_view_old/'+key,true);
        httpObject.setRequestHeader('content-type','application/json');
        httpObject.send();
}

function displayItem(id){
     window.location.assign("admin_home_viewold-more.html");
     localStorage.setItem("pid",id);
    return false;
    }
function toDate2(str) {
  // var str = moment(str).add(1, 'day');
   var from = str.split("-");
   
   var str=from[2]+"-"+ from[1] +"-"+ from[0];
   return (str);
}
