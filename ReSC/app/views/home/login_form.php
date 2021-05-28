<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/public/css/login_form.css">
    
    <title>login</title>
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
  <h1>Login Here </h1>

  <form action="/public/home/login_form/" method="post">
    <div >
    <label for="name"><b>Username</b></label>
    <input id="name" type="text" placeholder="Enter Username" name="username" class="__input" required>

    <label for="pwd"><b>Password</b></label>
    <input  id="pwd" type="password" placeholder="Enter Password" name="password" class="__input" required>
    <?php 
     if(isset($_GET["error"])){
  if($_GET["error"] == "invaliduser"){
    $class="__confirm";
    echo "<h4 id=$class>Wrong username or password </h4>";}}
    ?>
    <input type="submit" class="__input" name="login">
    
  </div>
    <a class="__anchor" href="/public/home/register_form/">Don't have an account?</a>
  </form>
</div>
</body>
</html>