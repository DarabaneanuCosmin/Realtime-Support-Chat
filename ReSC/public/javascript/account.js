function displayAccountOptions() {
    var x = document.getElementsByClassName("my_account_options")[0];
    if (x.style.display === "none") {
        x.style.display = "flex";
    }
}

function hideAccountOptions() {
    var x = document.getElementsById("popup_login");
    x.style.display = "none";
    var y = document.getElementsById("popup_register");
    y.style.display = "none";
}
var name_error = document.getElementById("name_error");
var password_error = document.getElementById("passwordError");
var confirmpassword_error = document.getElementById("confirmpasswordError");

function displayRegisterForm() {
    var x = document.getElementById("register_modal");
    x.style.display = "flex";

    var username = document.forms["__register_form"]["username"];
    var password = document.forms["__register_form"]["password"];
    var confirm_password = document.forms["__register_form"]["confirm_password"];


    username.addEventListener("blur", nameVerify, true);
    password.addEventListener("blur", passwordVerify, true);
    confirm_password.addEventListener("blur", confirmPasswordVerify, true);


}

function Validate() {
    //username validation
    if (username.value == "") {
        username.style.border = "1px solid red";
        name_error.textContent = "Username is required";
        username.focus();
        return false;
    }
    //password validation
    if (password.value == "") {
        password.style.border = "1px solid red";
        password_error.textContent = "Password is required";
        password.focus();
        return false;
    }
    if (password.value != confirm_password.value) {
        confirm_password.style.border = "1px solid red";
        confirmpassword_error.textContent = "Password should be the same";
        confirm_password.focus();
        return false;
    }
}

function nameVerify() {
    if (username.value != "") {
        username.style.border = "1px solid #5E6E66";
        name_error.innerHTML = "";
        return true;
    }
}

function passwordVerify() {
    if (password.value != "") {
        password.style.border = "1px solid #5E6E66";
        password_error.innerHTML = "";
        return true;
    }
}

function confirmPasswordVerify() {
    if (password.value != confirm_password.value) {
        password.style.border = "1px solid #5E6E66";
        confirmpassword_error.innerHTML = "";
        return true;
    }
}

function displayLoginForm() {
    var x = document.getElementById("login_modal");
    x.style.display = "flex";
}

function closeLoginForm() {
    var x = document.getElementById("login_modal");
    x.style.display = "none";
}

function closeRegisterForm() {
    var x = document.getElementById("register_modal");
    x.style.display = "none";
}

function closeLoginWindow() {
    var x = document.getElementById("login_modal");
    window.onclick = function(event) {
        if (event.target == x) {
            x.style.display = "none";
        }
    }
}

function closeRegisterWindow() {
    var x = document.getElementById("register_modal");
    window.onclick = function(event) {
        if (event.target == x) {
            x.style.display = "none";
        }
    }
}

function passwordCheck() {
    var password = document.getElementById("password")
    var confirm_password = document.getElementById("confirm_password");
    var x = document.getElementById("password_confirm");
    if (password.value != confirm_password.value) {
        x.style.display = 'block';
        displayRegisterForm();
    }
}