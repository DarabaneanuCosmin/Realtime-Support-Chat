<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="/public/css/register.css">
  <title>register</title>
</head>
<body>


<div class="__menu">
    <div class="_back__button">
    <a class="__anchor" href="/public/home/index/">
    <img alt="__back_button" src="/public/img/back_btn.png" class="__back_button">
  </a>
    </div>
  </div>
  <div class="__loginbox">
<div class="__login__image">
    <img src="/public/img/user.png" alt="logo" class="logo">
  </div>
  <h1>Register Here </h1>


<form method="POST"  action="/public/home/register_form/" onsubmit="return Validate()" name="register_form">
  <div >
     
   <div>
   <label for="name"><b>Username</b></label>
    <input  id="name" type="text" placeholder="Enter Username" name="username" class="__input" >
    <div id="name_error" class="val_error"> </div>
    <?php 
     if(isset($_GET["error"])){
  if($_GET["error"] == "invalidusername"){
    $class="confirm";
    echo "<h4 id=$class>Username already used</h4>";}}
    ?>
  </div>
    <div>
      <label for="pwd"><b>Password</b></label>
  <input  id="pwd" type="password" placeholder="Enter Password" name="password" class="__input"  >
  <div id="password_error" class="val_error"> </div>    
</div>
    
    <div>
    <label for="pwdv"><b>Password   </b></label>
    <input id="pwdv" type="password" placeholder="Repeat Password" name="password_confirmation" class="__input"  >
    <div id="password_confirm_error" class="val_error"> </div>
    
    <input type="submit" class="__input"  value="Register" name="register">
    </div>
    <?php
if(isset($_GET["error"])){
  
if($_GET["error"] == "none"){
  $id="__register__succes";
    echo "<p class=$id>You have signed up!Now you can login!</p>";
  }
}
?>
  </div>

  <div class="container signin">
    <p>Already have an account? <a href="/public/home/login_form/">Sign in</a>.</p>
  </div>
</form>
  </div>
</body>

</html>



<script type="text/javascript">
  var username = document.forms["register_form"]["username"];
  var password = document.forms["register_form"]["password"];
  var password_confirmation = document.forms["register_form"]["password_confirmation"];

  var name_error = document.getElementById("name_error");
  var password_error= document.getElementById("password_error");
  var password_confirm_error = document.getElementById("password_confirm_error");

  username.addEventListener("blur", nameVerify, true);
  password.addEventListener("blur",password,true);
  password_confirmation.addEventListener("blur",password_confirmation,true);

  function Validate(){
    if(username.value == ""){
      username.style.border = "1px solid red";
      name_error.textContent="Username is required";
      var phpError=document.getElementById("confirm");
      username.focus();
      return false;
    }

    if(password.value == ""){
      password.style.border = "1px solid red";
      password_error.textContent="Password is required";
      password.focus();
      return false;
    }
    

    if(password.value != password_confirmation.value){
      password_confirmation.style.border = "1px solid red";
      password_confirm_error.textContent="The two passwords do not match";
      password_confirmation.focus();
      return false;
    }

  }
function nameVerify(){
  if(username.value != ""){
    username.style.border = "1px solid black";
    name_error.innerHTML ="";
    var phpError=document.getElementById("confirm");
    if(phpError!= ""){
      phpError.innerHTML="";
    }
    return true;
  }
}
function password(){
  if(password.value != ""){
    password.style.border = "1px solid black";
    password_error.innerHTML ="";
    return true;
  }
}
function password_confirmation(){
  if(password_confirmation.value != ""){
    password_confirmation.style.border = "1px solid black";
    password_confirm_error.innerHTML ="";
    return true;
  }
}
</script>