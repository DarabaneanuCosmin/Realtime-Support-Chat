<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../public/css/index.css">
    <script src="../public/javascript/account.js"></script>
    <title>RealTimeSuport</title>
</head>
<body>
    <header class="index_header">
        <img src="../public/img/logo.png" class="index_header_logo">
        <div class="social_infos">
            <div class="social_info_buttons">
                <a href="https://discord.gg/BnquBzKdFA"><button class="discord_join_button"></button></a>
                <a href="https://www.facebook.com/"><button class="social_button_facebook"></button></a>
                <a href="https://www.instagram.com/"><button class="social_button_instagram"></button></a>
            
                <button onmouseover="displayAccountOptions()" onmouseleave="hideAccountOptions()" class="my_account_button">
                    <div class="my_account_options" style="display: none">
                        <a href="#">Login <div id="login_overlay">
                        </div></a>
                        <a href="#"">Register</a>
                    </div>
                </button>
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
    </main>

</body>
</html>