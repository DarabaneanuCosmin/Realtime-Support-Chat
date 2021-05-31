<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../css/adminPanel.css" />
    <title>Document</title>
</head>
<!--
<div class="panel__lowScreenDiv">
    <button class="panel__lowScreenBtn" onclick="panelFunction()">Back</button>
</div>

-->


<body id="bdy">

    <div class="panel">

        <section class="panel__sendMessages" id="conversations">
            <p class="message">Conversations</p>
            <div class="search">

                <span class="text">Select an user to start chat</span>
                <div class="panel__srcIntro">
                    <input type="text" placeholder="Enter name to search...">
                    <button class="panel__searchButton" onclick = "getUserRoomByName()">
                    </button>

                </div>
            </div>
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
                <img class="panel__setting__img" src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="">
            </div>
            <div>
                <select name="panel__personalizare" class="panel__personalizare">
                <option>Personalizeaza Conversatia</option>
                <option>Schimba tema</option>
                <option>Schimba emoji-ul</option>
            </select>
            </div>
            <div>
                <select name="panel__personalizare" class="panel__personalizare">
                <option>Confidentialitate si asistenta</option>
                <option>Sterge conversatia</option>
                <option>Blocheaza</option>
                
            </select>
            </div>

        </section>
    </div>


</body>

</html>