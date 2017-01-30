function client_script(){
	var httpObject=new XMLHttpRequest();
//THIS IS TO PASS THIS VAR TO NEXT PAGE TO GET THE PURCHASE DETAILS
	httpObject.onreadystatechange=function()
	{

    console.log(this.readyState);
    //document.getElementById("result").innerHTML=this.status;
   purchase_id=[];
    rejection_reason=[];
    if(this.readyState=='4' && this.status=='200')
    {
        var result=this.responseText;
        result=JSON.parse(result);
          //  console.log(result[0]);

            content = "<form><div class='table-responsive'><table class='table' id='table1'><thead><tr><th>No.</th><th>Received Date</th><th>Purchase Title</th><th>View More</th></tr></thead><tbody>";
        var i = 1;
        
        result.forEach(function(element) {

          //  console.log(content);
            var date=new Date(element.Created_date);
            date=date.toISOString().split('T')[0]
            date = toDate2(date);
            content += "<tr><td>" + i + "</td><td>" + date + "</td><td>" + element.Purchase_title + "</td><td><button id='viewmore' class='btn-info' type='button' onclick='return displayItem("+element.Purchase_id+");'>VIEW MORE</button></td></tr>"  ;
            purchase_id.push(element.Purchase_id);

           localStorage.setItem("pid",element.Purchase_id);


            i++;
        });
        // AT THE END I HAVE THE SAVE BUTTON
        
        content += "</tbody> </table> </div></form>";
                    
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

		httpObject.open('GET','http://192.168.1.230:8081/user_view_rejected'+key,true);
		httpObject.setRequestHeader('content-type','application/x-www-form-urlencoded');
		httpObject.send();
}



function displayItem(id){
    localStorage.setItem("pid_rejected",id);
     window.location.assign("user_home_viewrejected-more.html");
     console.log(id);
     
    return false;
    }

function toDate2(str) {
  // var str = moment(str).add(1, 'day');
   var from = str.split("-");
   
   var str=from[2]+"-"+ from[1] +"-"+ from[0];
   return (str);
}