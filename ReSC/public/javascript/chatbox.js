
//adauga event listener pentru enter, daca
// e chat-ul pornit trimite mesaj

addSendChatEnterEvent();

function addSendChatEnterEvent(){
    const messageInput = document.querySelector(".chatBoxStatic__inputText");

    messageInput.addEventListener("keyup", function(event) {
        if(event.keyCode == 13){
            addTypedMessage();
        }
    });

}


//Adjusteaza marimea listei de avatare

function adjustProperWidth(){
    let avatare = document.querySelectorAll(".chatBoxStatic__avatarInitials");

    if(avatare.length > 0){
        let positionInfoAvatar = avatare[0].getBoundingClientRect();
        let widthAvatar = positionInfoAvatar.width;
        let numarAvatare = avatare.length;
        const procent = 0.4;

        let totalWidth = widthAvatar + 5;
        console.log(widthAvatar);
        let totalWidthString;

        if(avatare.length > 1){
            totalWidth += (numarAvatare - 1) * (1 - procent) * widthAvatar;
        }

        totalWidthString = totalWidth + "px";

        avatare[0].parentElement.style.width = totalWidthString;
        console.log(totalWidthString);
    }
}


function addTypedMessage(){

    const messageInput = document.querySelector(".chatBoxStatic__inputText");
    //fa rost de mesaj din input box
    const message =  messageInput.value;

    if(!message.trim().length){
        return;
    }
    
    //fa rost de elementul dummy din capul div-ului,
    // element care are un anumit id si e display none by default
    // si fa alta instanta
    const dummyElement = document.querySelector("#chatBoxStatic__dummyMessage").cloneNode(true);
    
    //interogheaza pentru containeru de mesaje
    const container = document.querySelector(".chatBoxStatic__messageContainer");

    //fa rost de paragraful ce va primi mesajul din body-ul mesajului
    const dummyElementText = dummyElement.querySelector(".chatBoxStatic__messageText");


    //fa obiecutl nou clonat sa fie vizibil si nu none ca cel dummy initial
    dummyElement.style.display = "block";

    //pune-i mesajul
    dummyElementText.innerHTML = message;

    //adauga tot elementul cu speech bubble-ul
    container.appendChild(dummyElement);

    //scrolleaza cat de mult se poate in jos ca sa fie vizibil imediat
    container.scrollTop = container.scrollHeight;


    //fa clear la campul de scris mesaj
    messageInput.value = "";
}

function showChat(){

    const chatElement = document.querySelector(".chatBoxStatic");
    const showButton = document.querySelector(".chatBoxStatic__showButton");

    chatElement.style.display = "block";
    showButton.style.display = "none";

    adjustProperWidth();
}

function hideChat(){

    const chatElement = document.querySelector(".chatBoxStatic");
    const showButton = document.querySelector(".chatBoxStatic__showButton");

    chatElement.style.display = "none";
    showButton.style.display = "block";
}

function showConvList(){
    const chatListElement = document.querySelector(".chatBoxStatic__recentConversationsList");

    chatListElement.style.display="block";
}

function hideConvList(){
    const chatListElement = document.querySelector(".chatBoxStatic__recentConversationsList");

    chatListElement.style.display="none";
}


