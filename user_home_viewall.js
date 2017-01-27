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

            content = "<div class='table table-responsive'><table class='table' id='table1'><thead><tr><th>No.</th><th>Purchase Title</th><th>Status</th><th>Created_date</th></tr></thead><tbody>";
        var i = 1;
        result.forEach(function(element) {
            console.log(content);
            content += "<tr><td>" + i + "</td><td>" + element.Purchase_title + "</td><td>" + element.Status + "</td><td>" + element.Created_date+"<button>View More</button>" +"</td></tr>" ;
            // "</td><td>" + element.DeptID + "</td><td>" + element.Date + "</td><td>" + element.EID + "</td><td>" + element.Quantity + "</td><td>" + element.Price + "</td><td>" + element.Location + "</td><td>" + element.Description + "</td><td><button onclick='deleteRow("+i+")'>Delete</BUTTON></td></tr>"
            i++;
        });
        content += "</tbody> </table> </div>";
                    
                document.getElementById('display_purchase_details').innerHTML = content;

            
    }
}
		httpObject.open('GET','http://127.0.0.1:8081/user_view_all',true);
		httpObject.setRequestHeader('content-type','application/json');
		httpObject.send();
    }