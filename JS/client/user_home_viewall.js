function client_script(){
var httpObject=new XMLHttpRequest();
	httpObject.onreadystatechange=function()
	{

    console.log(this.readyState);
    //document.getElementById("result").innerHTML=this.status;
    if(this.readyState=='4' && this.status=='200')
    {
        var result=this.responseText;
        result=JSON.parse(result);
            console.log(result[0]);

            content = "<div class='table table-responsive'><table class='table table-responsive table-hover' id='table1'><thead><tr><th>No.</th><th>Purchase Title</th><th>Status</th><th>Created date</th><th>Created time</th><th>View More</th></tr></thead><tbody>";
        var i = 1;
        result.forEach(function(element) {
          console.log(new Date(element.Created_date));
            var date=new Date(element.Created_date);
            date=date.toISOString().split('T')[0]
            date = toDate2(date);


            content += "<tr><td>" + i + "</td><td>" + element.Purchase_title + "</td><td>" + element.Status + "</td><td>" + date+"</td><td></td><td>"+"<button id='viewmore' class='btn-info' onclick='displayItem("+element.Purchase_id+");'>View More</button>" +"</td></tr>" ;
            
            i++;
        });
        content += "</tbody> </table> </div>";  
        document.getElementById('display_purchase_details').innerHTML = content;
        $('#table1').DataTable();
    
            
    }
}

            //PASSING USER NAME
var username=localStorage.getItem('USERNAME');
var token=localStorage.getItem('TOKEN');

document.getElementById('welcome_username').innerHTML=username;
console.log(username,token);
var key={'username':username,'token':token};
key=JSON.stringify(key);
		httpObject.open('GET','http://192.168.1.230:8081/user_view_all'+key,true);
		httpObject.setRequestHeader('content-type','application/json');
		httpObject.send();
    }



function displayItem(id){
    console.log("Inside displayItem");
     document.location.href="user_home_viewall-more.html";
     localStorage.setItem("pid_user",id);
   
    }

function verify(){
  username=localStorage.getItem('USERNAME');
  console.log(username);
  if(username==null){

    document.location.href="login.html";
  }
}
function toDate2(str) {
  // var str = moment(str).add(1, 'day');
   var from = str.split("-");
   
   var str=from[2]+"-"+ from[1] +"-"+ from[0];
   return (str);
}
function toTime(str) {
   var from = str.split(":");
   var dt = moment(from[0]+":"+from[1], ["HH:mm"]).format("hh:mm a");
   //var str=(Number(from[2])+1)+"-"+ from[1] +"-"+ from[0];
   return (dt);
}