<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../css/adminPanel.css" />
    <script src="/public/javascript/adminPanel.js"></script>
    <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
    <script>
        $(document).ready(function(){
            function refresh()
            {
                var div = $('#conversations'),
                    divHtml = div.php();

                div.php(divHtml);
            }

            setInterval(function()
            {
                refresh()
            }, 1000);
        })
    </script>
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
            <?php
                //add call to api to update conversation.json
                $encodedData = file_get_contents('conversation.json');
                $data = json_decode($encodedData,true);
                foreach($data as $user){

                    echo "<a href="."#".">".
                    "<div class="."panel_conversation".">".
                        "<img class="."panel__image"." src="."https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80".">".
                        "<div class="."panel__details".">".
                            "<span>".
                                $user['username']
                            ."</span>
                        </div>
                        <div class="."panel__status-dot"."><span class="."circle"."></span></div>
    
                    </div>
                </a>";
                }
            ?>
        </section>




        <div class="panel__readMessages">
            <div class="panel__incomingMessages">
                <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" class="panel__img">
                <div class="panel_details">
                    <p class="p__d">
                        Buna ziua! Ma numesc .. si as avea nevoie de ajutor in legatura cu... </p>
                </div>
            </div>
            <div class="panel__output">
                <div class="panel_details">
                    <p class="p__details">Buna ziua!Sigur, te ascult</p>
                </div>
            </div>


            <div class="panel__output">
                <div class="panel_details">
                    <p class="p__details">Sper ca te pot ajuta</p>
                </div>
            </div>
            <div class="panel__incomingMessages">
                <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" class="panel__img">
                <div class="panel_details">
                    <p class="p__d">
                        As avea nevoie de bilet catre Italia pe data de 23 Iunie 2021. As dori sa stiu cum as putea achita si daca ....
                </div>
            </div>
            <div class="panel__output">
                <div class="panel_details">
                    <p class="p__details">
                        Desigur, sfatul meu este sa va uitati putin pe acest site si sa ..
                    </p>

                </div>
            </div>
            <div class="panel__incomingMessages">
                <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" class="panel__img">
                <div class="panel_details">
                    <p class="p__d">
                        Cooperare... Nu trebuie să vă certați cu clientul, trebuie să-i demonstrați că are într-adevăr nevoie de produsul dvs. și scopul apelului dvs. este ajutorul. Pentru a face acest lucru, trebuie să puneți unui potențial client astfel de întrebări, răspunsurile
                        la care știți în avans. De exemplu, manager: „Folosești multă hârtie pe lună?”, Client: „da”, manager: „cumperi un pachet nou de hârtie în fiecare săptămână”, client: „da”, manager: „ți-ar plăcea compania noastră v-ați livrat hârtie
                        la birou în fiecare săptămână la o oră convenabilă pentru dvs.? "
                    </p>
                </div>
            </div>
            <div class="panel__output">
                <div class="panel_details">
                    <p class="p__details">

                        Cooperare... Nu trebuie să vă certați cu clientul, trebuie să-i demonstrați că are într-adevăr nevoie de produsul dvs. și scopul apelului dvs. este ajutorul. Pentru a face acest lucru, trebuie să puneți unui potențial client astfel de întrebări, răspunsurile
                        la care știți în avans. De exemplu, manager: „Folosești multă hârtie pe lună?”, Client: „da”, manager: „cumperi un pachet nou de hârtie în fiecare săptămână”, client: „da”, manager: „ți-ar plăcea compania noastră v-ați livrat hârtie
                        la birou în fiecare săptămână la o oră convenabilă pentru dvs.? "
                    </p>
                </div>
            </div>
            <div class="panel__incomingMessages">
                <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" class="panel__img">
                <div class="panel_details">
                    <p class="p__d">
                        Cooperare... Nu trebuie să vă certați cu clientul, trebuie să-i demonstrați că are într-adevăr nevoie de produsul dvs. și scopul apelului dvs. este ajutorul. Pentru a face acest lucru, trebuie să puneți unui potențial client astfel de întrebări, răspunsurile
                        la care știți în avans. De exemplu, manager: „Folosești multă hârtie pe lună?”, Client: „da”, manager: „cumperi un pachet nou de hârtie în fiecare săptămână”, client: „da”, manager: „ți-ar plăcea compania noastră v-ați livrat hârtie
                        la birou în fiecare săptămână la o oră convenabilă pentru dvs.? "
                    </p>
                </div>
            </div>
            <div class="panel__output">
                <div class="panel_details">
                    <p class="p__details">
                        Cooperare... Nu trebuie să vă certați cu clientul, trebuie să-i demonstrați că are într-adevăr nevoie de produsul dvs. și scopul apelului dvs. este ajutorul. Pentru a face acest lucru, trebuie să puneți unui potențial client astfel de întrebări, răspunsurile
                        la care știți în avans. De exemplu, manager: „Folosești multă hârtie pe lună?”, Client: „da”, manager: „cumperi un pachet nou de hârtie în fiecare săptămână”, client: „da”, manager: „ți-ar plăcea compania noastră v-ați livrat hârtie
                        la birou în fiecare săptămână la o oră convenabilă pentru dvs.? "
                    </p>
                </div>
            </div>
            <div class="panel__incomingMessages">
                <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" class="panel__img">
                <div class="panel_details">
                    <p class="p__d">
                        Cooperare... Nu trebuie să vă certați cu clientul, trebuie să-i demonstrați că are într-adevăr nevoie de produsul dvs. și scopul apelului dvs. este ajutorul. Pentru a face acest lucru, trebuie să puneți unui potențial client astfel de întrebări, răspunsurile
                        la care știți în avans. De exemplu, manager: „Folosești multă hârtie pe lună?”, Client: „da”, manager: „cumperi un pachet nou de hârtie în fiecare săptămână”, client: „da”, manager: „ți-ar plăcea compania noastră v-ați livrat hârtie
                        la birou în fiecare săptămână la o oră convenabilă pentru dvs.? " </p>
                </div>
            </div>
            <div class="panel__output">
                <div class="panel_details">
                    <p class="p__details">
                        Cooperare... Nu trebuie să vă certați cu clientul, trebuie să-i demonstrați că are într-adevăr nevoie de produsul dvs. și scopul apelului dvs. este ajutorul. Pentru a face acest lucru, trebuie să puneți unui potențial client astfel de întrebări, răspunsurile
                        la care știți în avans. De exemplu, manager: „Folosești multă hârtie pe lună?”, Client: „da”, manager: „cumperi un pachet nou de hârtie în fiecare săptămână”, client: „da”, manager: „ți-ar plăcea compania noastră v-ați livrat hârtie
                        la birou în fiecare săptămână la o oră convenabilă pentru dvs.? "
                    </p>
                </div>
            </div>
            <div class="panel__incomingMessages">
                <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" class="panel__img">
                <div class="panel_details">
                    <p class="p__d">
                        Cooperare... Nu trebuie să vă certați cu clientul, trebuie să-i demonstrați că are într-adevăr nevoie de produsul dvs. și scopul apelului dvs. este ajutorul. Pentru a face acest lucru, trebuie să puneți unui potențial client astfel de întrebări, răspunsurile
                        la care știți în avans. De exemplu, manager: „Folosești multă hârtie pe lună?”, Client: „da”, manager: „cumperi un pachet nou de hârtie în fiecare săptămână”, client: „da”, manager: „ți-ar plăcea compania noastră v-ați livrat hârtie
                        la birou în fiecare săptămână la o oră convenabilă pentru dvs.? "

                    </p>
                </div>
            </div>
            <div class="panel__output">
                <div class="panel_details">
                    <p class="p__details">Cooperare... Nu trebuie să vă certați cu clientul, trebuie să-i demonstrați că are într-adevăr nevoie de produsul dvs. și scopul apelului dvs. este ajutorul. Pentru a face acest lucru, trebuie să puneți unui potențial client astfel
                        de întrebări, răspunsurile la care știți în avans. De exemplu, manager: „Folosești multă hârtie pe lună?”, Client: „da”, manager: „cumperi un pachet nou de hârtie în fiecare săptămână”, client: „da”, manager: „ți-ar plăcea compania
                        noastră v-ați livrat hârtie la birou în fiecare săptămână la o oră convenabilă pentru dvs.? "</p>
                </div>
            </div>
            <div class="panel__incomingMessages">
                <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" class="panel__img">
                <div class="panel_details">
                    <p class="p__d">
                        Cooperare... Nu trebuie să vă certați cu clientul, trebuie să-i demonstrați că are într-adevăr nevoie de produsul dvs. și scopul apelului dvs. este ajutorul. Pentru a face acest lucru, trebuie să puneți unui potențial client astfel de întrebări, răspunsurile
                        la care știți în avans. De exemplu, manager: „Folosești multă hârtie pe lună?”, Client: „da”, manager: „cumperi un pachet nou de hârtie în fiecare săptămână”, client: „da”, manager: „ți-ar plăcea compania noastră v-ați livrat hârtie
                        la birou în fiecare săptămână la o oră convenabilă pentru dvs.? "
                    </p>
                </div>
            </div>
            <div class="panel__output">
                <div class="panel_details">
                    <p class="p__details">
                        Cooperare... Nu trebuie să vă certați cu clientul, trebuie să-i demonstrați că are într-adevăr nevoie de produsul dvs. și scopul apelului dvs. este ajutorul. Pentru a face acest lucru, trebuie să puneți unui potențial client astfel de întrebări, răspunsurile
                        la care știți în avans. De exemplu, manager: „Folosești multă hârtie pe lună?”, Client: „da”, manager: „cumperi un pachet nou de hârtie în fiecare săptămână”, client: „da”, manager: „ți-ar plăcea compania noastră v-ați livrat hârtie
                        la birou în fiecare săptămână la o oră convenabilă pentru dvs.? "
                    </p>
                </div>
            </div>
            <div class="panel__incomingMessages">
                <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" class="panel__img">
                <div class="panel_details">
                    <p class="p__d">
                        Cooperare... Nu trebuie să vă certați cu clientul, trebuie să-i demonstrați că are într-adevăr nevoie de produsul dvs. și scopul apelului dvs. este ajutorul. Pentru a face acest lucru, trebuie să puneți unui potențial client astfel de întrebări, răspunsurile
                        la care știți în avans. De exemplu, manager: „Folosești multă hârtie pe lună?”, Client: „da”, manager: „cumperi un pachet nou de hârtie în fiecare săptămână”, client: „da”, manager: „ți-ar plăcea compania noastră v-ați livrat hârtie
                        la birou în fiecare săptămână la o oră convenabilă pentru dvs.? "
                    </p>
                </div>
            </div>
            <form action="#" class="panel_typing-area">
                <input type="text" placeholder="Type a message here." class="panel__input">
                <button class="panel_sent-button"><i></i></button>
            </form>
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