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

        <section class="panel__sendMessages">
            <p class="message">Conversations</p>
            <div class="search">

                <span class="text">Select an user to start chat</span>
                <div class="panel__srcIntro">
                    <input type="text" placeholder="Enter name to search...">
                    <button class="panel__searchButton"> </button>

                </div>
            </div>
            <a href="#">
                <div class="panel_conversation">
                    <img class="panel__image" src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="">
                    <div class="panel__details">
                        <span>Dărăbăneanu Cosmin</span>
                        <p class="panel__p_class">This is a test message</p>
                    </div>
                    <div class="panel__status-dot"><span class="circle"></span></div>

                </div>
            </a>
            <a href="#">
                <div class="panel_conversation">
                    <img class="panel__image" src="https://images.pexels.com/photos/2860897/pexels-photo-2860897.jpeg?cs=srgb&dl=pexels-ayaka-kato-2860897.jpg&fm=jpg" alt="">
                    <div class="panel__details">
                        <span>Popescu Mihail</span>
                        <p class="panel__p_class">This is a test message</p>
                    </div>
                    <div class="panel__status-dot"><span class="circle"></span></div>
                </div>
            </a>
            <a href="#">
                <div class="panel_conversation">
                    <img class="panel__image" src="https://images.pexels.com/photos/2874440/pexels-photo-2874440.jpeg?cs=srgb&dl=pexels-allan-franca-carmo-2874440.jpg&fm=jpg" alt="">
                    <div class="panel__details">
                        <span>Sotropa Ionel</span>
                        <p class="panel__p_class">This is a test message</p>
                    </div>
                    <div class="panel__status-dot"><span class="circle"></span></div>
                </div>
            </a>
            <a href="#">
                <div class="panel_conversation">
                    <img class="panel__image" src="https://images.pexels.com/photos/7214928/pexels-photo-7214928.jpeg?cs=srgb&dl=pexels-anna-nekrashevich-7214928.jpg&fm=jpg" alt="">
                    <div class="panel__details">
                        <span>Ihnea Gheorghe</span>
                        <p class="panel__p_class">This is a test message</p>
                    </div>
                    <div class="panel__status-dot"><span class="circle"></span></div>
                </div>
            </a>
            <a href="#">
                <div class="panel_conversation">
                    <img class="panel__image" src="https://images.pexels.com/photos/2629233/pexels-photo-2629233.jpeg?cs=srgb&dl=pexels-josh-hild-2629233.jpg&fm=jpg" alt="">
                    <div class="panel__details">
                        <span>Morosan Andrei</span>
                        <p class="panel__p_class">This is a test message</p>
                    </div>
                    <div class="panel__status-dot"><span class="circle"></span></div>
                </div>
            </a>
            <a href="#">
                <div class="panel_conversation">
                    <img class="panel__image" src="https://images.pexels.com/photos/3738673/pexels-photo-3738673.jpeg?cs=srgb&dl=pexels-erik-karits-3738673.jpg&fm=jpg" alt="">
                    <div class="panel__details">
                        <span>Prelipcean Alexandra</span>
                        <p class="panel__p_class">This is a test message</p>
                    </div>
                    <div class="panel__status-dot"><span class="circle"></span></div>
                </div>
            </a>
            <a href="#">
                <div class="panel_conversation">
                    <img class="panel__image" src="https://images.pexels.com/photos/3614316/pexels-photo-3614316.jpeg?cs=srgb&dl=pexels-agung-pandit-wiguna-3614316.jpg&fm=jpg" alt="">
                    <div class="panel__details">
                        <span>Ana Maria Ionescu</span>
                        <p class="panel__p_class">This is a test message</p>
                    </div>
                    <div class="panel__status-dot"><span class="circle"></span></div>
                </div>
            </a>
            <a href="#">
                <div class="panel_conversation">
                    <img class="panel__image" src="https://images.pexels.com/photos/3597423/pexels-photo-3597423.jpeg?cs=srgb&dl=pexels-verschoren-maurits-3597423.jpg&fm=jpg" alt="">
                    <div class="panel__details">
                        <span>Maftean Vasile</span>
                        <p class="panel__p_class">This is a test message</p>
                    </div>
                    <div class="panel__status-dot"><span class="circle"></span></div>
                </div>
            </a>
            <a href="#">
                <div class="panel_conversation">
                    <img class="panel__image" src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="">
                    <div class="panel__details">
                        <span>Ionel </span>
                        <p class="panel__p_class">This is a test message</p>
                    </div>
                    <div class="panel__status-dot"><span class="circle"></span></div>
                </div>
            </a>
            <a href="#">
                <div class="panel_conversation">
                    <img class="panel__image" src="https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg?cs=srgb&dl=pexels-sem-steenbergen-3621344.jpg&fm=jpg" alt="">
                    <div class="panel__details">
                        <span>Sandu</span>
                        <p class="panel__p_class">This is a test message</p>
                    </div>
                    <div class="panel__status-dot"><span class="circle"></span></div>
                </div>
            </a>
            <a href="#">
                <div class="panel_conversation">
                    <img class="panel__image" src="https://images.pexels.com/photos/3610649/pexels-photo-3610649.jpeg?cs=srgb&dl=pexels-zachary-debottis-3610649.jpg&fm=jpg" alt="">
                    <div class="panel__details">
                        <span>mihai123@gmail.com</span>
                        <p class="panel__p_class">This is a test message</p>
                    </div>
                    <div class="panel__status-dot"><span class="circle"></span></div>
                </div>
            </a>
            <a href="#">
                <div class="panel_conversation">
                    <img class="panel__image" src="https://images.pexels.com/photos/3693787/pexels-photo-3693787.jpeg?cs=srgb&dl=pexels-tom-balabaud-3693787.jpg&fm=jpg" alt="">
                    <div class="panel__details">
                        <span>Popescu Eusebiu</span>
                        <p class="panel__p_class">This is a test message</p>
                    </div>
                    <div class="panel__status-dot"><span class="circle"></span></div>
                </div>
            </a>
            <a href="#">
                <div class="panel_conversation">
                    <img class="panel__image" src="https://images.pexels.com/photos/3645606/pexels-photo-3645606.jpeg?cs=srgb&dl=pexels-luis-quintero-3645606.jpg&fm=jpg" alt="">
                    <div class="panel__details">
                        <span>Modoranu Cosmin</span>
                        <p class="panel__p_class">This is a test message</p>
                    </div>
                    <div class="panel__status-dot"><span class="circle"></span></div>
                </div>
            </a>
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