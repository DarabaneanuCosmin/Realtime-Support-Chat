function displayAccountOptions(){
    var x = document.getElementsByClassName("my_account_options")[0];
    if(x.style.display === "none"){
        x.style.display = "flex";
    }
}
function hideAccountOptions(){
    var x = document.getElementsByClassName("my_account_options")[0];
    if(x.style.display === "flex"){
        x.style.display = "none";
    }
}
function displayLoginForm(){
    var x = document.getElementById("login_overlay");
    window.onclick = function(event){
        if(event.target == x){
            x.style.display = "none";
        }
    }
}