<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AdminPanel</title>
</head>


<body id="bdy">

    <div class="panel">

        <section class="panel__sendMessages" id="conversations">
            <p class="message">Conversations</p>
            <script src="/public/javascript/adminPanel.js"></script>
        </section>

        <div class="panel__readMessages" id="read__messages">
            <div id="messagesCenter">
            </div>
            <div id="adminSendMessage" style="display:none">
            <textarea placeholder="Scrie ceva.." class="panel__input" rows="1" id="adminMessage"></textarea>
            <button class="panel_sent-button" onclick="getTextFromAdmin()"></button>
            </div>
        </div>

        <section class="panel__settings">
            <div>
                <img class="panel__setting__img" alt="photo" src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" >
            </div>
            <div>
                <select id="themeSelect" name="panel__personalizare" class="panel__personalizare">
                <option value = "1" selected = "selected">LightMode</option>
                <option value = "2" >DarkMode</option>
            
            </select>
            <button id="themeBtn" class = "themeButton" onclick="applyTheme()">Apply</button>
            </div>
        </section>
    </div>
    <script src="/public/javascript/theme.js"></script>
</body>

</html>