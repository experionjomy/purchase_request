console.log("this page");
var status_array=[];
function storeData(element,reasons) {

    var table=document.getElementById(table1);
    var length=table1.rows.length;
    
    for (var i = 0; i<length-1; i++) {
    
    var status_demo={purchase_id:"",status_of_item:""};
                status_demo.purchase_id=element[i];
                console.log(element[i]);
                var a=document.getElementById("save_status"+element[i]).value;
                status_demo.status_of_item=document.getElementById("save_status"+element[i]).value;
               
                status_array.push(status_demo);
                console.log(status_array);
                };
    storeReason(reasons);
var httpObject=new XMLHttpRequest();
    httpObject.onreadystatechange=function()
    {
        var result=this.responseText;
        result=JSON.parse(result);
  if(this.readyState=='4' && this.status=='200')
        {
            if(result=="success"){
                console.log("INN");
                window.location.href="admin_home_viewall.html";

    }
}
}
httpObject.open('POST','http://127.0.0.1:8081/update_purchasedata',true);
        httpObject.setRequestHeader('content-type','application/json');
        httpObject.send(JSON.stringify(status_array));
    
        
    }


//----------------------------------------------------------------------------------------------------------------------------------


var reason_array=[];
function storeReason(reasons) {
    var length=reasons.length;
  
    
    for (var i = 0; i<length; i++) {
    
    var reason_demo={purchase_id:"",reason_for_rejection:""};
                reason_demo.purchase_id=reasons[i];
                reason_demo.reason_for_rejection=document.getElementById("reason"+reasons[i]).value;
                reason_array.push(reason_demo);
                console.log(reason_array);
                };
    

var httpObject1=new XMLHttpRequest();
    httpObject1.onreadystatechange=function()
    {
         if(this.readyState=='4' && this.status=='200')
        {


            }

        }
    
httpObject1.open('POST','http://127.0.0.1:8081/rejection_reason_update',true);
        httpObject1.setRequestHeader('content-type','application/json');
        httpObject1.send(JSON.stringify(reason_array));
    }




//-------------------------------------------------------------------------------------------------------------------------------

function displayItem(id){
	 window.location.assign("admin_home_viewall-more.html");
	 localStorage.setItem("pid",id);
	return false;
	}


function logout(){
    if(confirm("Are you sure?"))
    {
    window.location="login.html";
   
    }
    else{
        return false;
    }

}


function client_script(){

var username=localStorage.getItem('USERNAME');
var token=localStorage.getItem('TOKEN');
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

            content = "<form id='myform'><div class='table table-responsive'><table class='table' id='table1'><thead><tr><th>No.</th><th>Owned By</th><th>Received Date</th><th>Purchase Title</th><th>View More</th><th>Action</th></tr></thead><tbody>";
        var i = 1;
        
        result.forEach(function(element) {

          //  console.log(content);
          
            content += "<tr><td>" + i + "</td><td>"+element.username+"</td><td>" + element.Created_date + "</td><td>" + element.Purchase_title + "</td><td><button class='viewmore' onclick='return displayItem("+element.Purchase_id+");'>VIEW MORE</button></td><td><select class='select_action' id='save_status"+element.Purchase_id+"' onchange='displayBox(this.value,"+element.Purchase_id+",rejection_reason);'>"+"<option value='pending'>pending</option><option value='approved'>approved</option><option value='rejected'>rejected</option></select><input type='textbox' id='reason"+element.Purchase_id+"' placeholder='Enter Reason' style='visibility:hidden;'/></td><td style="+"display:none"+">" + element.Purchase_id + "</td></tr>"  ;
            purchase_id.push(element.Purchase_id);

           localStorage.setItem("pid",element.Purchase_id);


            i++;
        });
        // AT THE END I HAVE THE SAVE BUTTON
        
        content += "</tbody> </table><button type='button' onclick='storeData(purchase_id,rejection_reason);'> SAVE </button> </div></form>";
                    
                document.getElementById('display_purchase_details').innerHTML = content;      

    }
}
   
        // var key={'username':username,'token':token};
        // key=JSON.stringify(key);

		httpObject.open('GET','http://127.0.0.1:8081/admin_view_all',true);
		httpObject.setRequestHeader('content-type','application/x-www-form-urlencoded');
		httpObject.send();
}






function displayBox(value,id){
   

    console.log(id);
            if (value=='rejected'){
                 document.getElementById("reason"+id).style.visibility='visible';
                 rejection_reason.push(id);
                 console.log(rejection_reason);
               
            }else {
                 document.getElementById("reason"+id).style.visibility='hidden';
            };
            return rejection_reason;
            
        }