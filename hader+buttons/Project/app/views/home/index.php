<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/index.css">
    <script src="../javascript/account.js"></script>
    <title>RealTimeSuport</title>
</head>
<body>
    <header class="index_header">
        <img src="../img/logo.png" class="index_header_logo">
        <div class="index_sub_header">
        <div class="social_info_buttons">
            <a href="https://discord.gg/BnquBzKdFA"><button class="discord_join_button"></button></a>
            <a href="https://www.facebook.com/"><button class="social_button_facebook"></button></a>
            <a href="https://www.instagram.com/"><button class="social_button_instagram"></button></a>
        </div>
        <div class="account_options">    
            <button onclick="displayLoginForm()" class= "open_login_form" id="popup_login" >Login</button>
            <button onclick="displayRegisterForm()" class= "open_register_form" id="popup_register" >Register</button>
        </div>
        </div>
    </header>
    <div class="principal_buttons">
        <button>Home</button>
        <button>About</button>
        <button>BlaBla</button>
        <button>Stats</button>
        <button>Hehe</button>
        <button>Nast</button>
        <button>Others</button>
    </div>
    <main>         
        <div id="register_modal" class="popup_form" onclick="closeRegisterWindow()">
            <div id="form_modal_register">
                <form class="form_container" id="formrcont" method="post" action="../home/register/">
                    <h3>Register</h3>
                    <label for="username"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="username" required>
    
                    <label for="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" required>
                    <label for="password2"><b>Confirm Password</b></label>
                    <input type="password" placeholder="Confirm Password" name="confirm_password" required>
                    <button type="submit" id="form_r_button" name="submit">Register</button>
                </form>
                <button onclick="closeRegisterForm()" class="close_register">X</button>
            </div>
        </div>
        
        <div id="login_modal" class="popup_form" onclick="closeLoginWindow()">
            <div id="form_modal_login">
                <form class="form_container" id="formlcont" method="post" action="../home/login/">
                    <h3>Login</h3>
                    <label for="username"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="username" required>
        
                    <label for="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" required>
        
                    <label>
                        <input type="checkbox" checked="checked" name="remember"> Remember me
                    </label>
        
                    <button type="submit" id="form_l_button" name="submit">Login</button>
                </form>
                <button onclick="closeLoginForm()" class="close_login">X</button>
            </div>
        </div>
    </main>

</body>
</html>