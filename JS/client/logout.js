function logout() {
bootbox.confirm({
    message: "Are you sure?",
    buttons: {
        confirm: {
            label: 'Yes',
            className: 'btn-success'
        },
        cancel: {
            label: 'No',
            className: 'btn-danger'
        }
    },
    callback: function (result) {
        if(result){

        localStorage.clear();
        window.location = "login.html";
       }
    }
});
}
function verify(){
  username=localStorage.getItem('USERNAME');
  console.log(username);
  if(username==null){

    document.location.href="login.html";
  }
}