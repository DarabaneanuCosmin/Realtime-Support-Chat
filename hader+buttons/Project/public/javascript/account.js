function displayAccountOptions(){
    var x = document.getElementsByClassName("my_account_options")[0];
    if(x.style.display === "none"){
        x.style.display = "flex";
    }
}
function hideAccountOptions(){
    var x = document.getElementsById("popup_login");
        x.style.display = "none";
    var y = document.getElementsById("popup_register");
        y.style.display = "none";
}

function displayRegisterForm(){
    var x = document.getElementById("register_modal");
        x.style.display = "flex";
}

function displayLoginForm(){
    var x = document.getElementById("login_modal");
        x.style.display = "flex";
}

function closeLoginForm(){
  var x = document.getElementById("login_modal");
    x.style.display = "none";
}
function closeRegisterForm(){
  var x = document.getElementById("register_modal");
    x.style.display = "none";
}

function closeLoginWindow(){
    var x = document.getElementById("login_modal");
    window.onclick = function(event){
        if(event.target == x){
            x.style.display = "none";
        }
    }
}
function closeRegisterWindow(){
    var x = document.getElementById("register_modal");
    window.onclick = function(event){
        if(event.target == x){
            x.style.display = "none";
        }
    }
}

function passwordCheck(){
    var password = document.getElementById("password")
    var confirm_password = document.getElementById("confirm_password");
    var x = document.getElementById("password_confirm");
    if(password.value != confirm_password.value) {
        x.style.display = 'block';
    }
}