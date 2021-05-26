

import {validateMessage} from './messageValidator.js'
import {getSessionId} from '../cookies/sessionidReader.js'
import {createRoomForUser, addSentMessage, aquireMessageList} from './apiCalls.js'
import {Message} from './message.js'


//adauga event listener pentru enter, daca
// e chat-ul pornit trimite mesaj

addEvents();

let messageList = [];
let chatVisible = false;
let convListVisible = false;
let latestIntervalId = -1;
let idRoom = -1;


function addEvents(){
    const messageInput = document.querySelector(".chatBoxStatic__inputText");
    const showChatBoxButton = document.querySelector(".chatBoxStatic__showButton");
    const showConvListButton = document.querySelector(".chatBoxStatic__backButton");
    const minimizeButton = document.querySelector(".chatBoxStatic__minimizeButton");
    const messagesButton = document.querySelector(".chatBoxStatic__btnmessages");
    const sendMessageButton = document.querySelector(".chatBoxStatic__sendMessageButton")

    sendMessageButton.addEventListener("click", (e)=>{
        addTypedMessage();
    });

    messageInput.addEventListener("keyup", function(event) {
        if(event.keyCode == 13){
            addTypedMessage();
        }
    });

    messagesButton.addEventListener("click", (e) => {
        showConvList();
        clearInterval(latestIntervalId);
    });

    minimizeButton.addEventListener("click", (e) =>{
        hideChat();
    });

    showChatBoxButton.addEventListener("click", async (e) => {
        if(chatVisible == true){
            hideChat();
        } else {
            showChat();
            hideConvList();

            idRoom = await createRoomForUser("555");
            messageList = await aquireMessageList(idRoom, "555");
        }
        chatVisible = !chatVisible;
         });

    showConvListButton.addEventListener("click", (e) => {
        if(convListVisible == true){
            showChat();
            hideConvList();
        }
        convListVisible = !convListVisible;
    });
}


async function startUpdatingChatMessages(){


    let idInterval = setInterval(async () => {

        const newMessageList = await aquireMessageList(idRoom, "555")
        .then(data => updateMessageBubbles(data))
        .catch(err => console.log(err));
    }, 1000);

    return idInterval;
}

function updateMessageBubbles(messages){
    
    const messageContainer = document.querySelector('.chatBoxStatic__messageContainer');

    messageContainer.innerHTML = "<div class=\"chatBoxStatic__messageMask\" id=\"chatBoxStatic__dummyMessage\">\r\n                  <div class=\"chatBoxStatic__messageSent speech-bubble\">\r\n                     <p class=\"chatBoxStatic__messageText\">Hello!<\/p>\r\n                  <\/div>\r\n               <\/div>";

    messages.forEach((element) => {
        let newSpeechBubble = document.createElement("div");

        if(element.sentByMe == true){
            newSpeechBubble.innerHTML = " <div class=\"chatBoxStatic__messageMask\">\r\n                  <div class=\"chatBoxStatic__messageSent speech-bubble\">\r\n                     <p class=\"chatBoxStatic__messageText\">" + element.messageText + "<\/p>\r\n                  <\/div>\r\n               <\/div>"
        } else {
            newSpeechBubble.innerHTML = "<div class=\"chatBoxStatic__messageMask\">\r\n                  <p class=\"chatBoxStatic__senderLabel\">Nicu<\/p>\r\n                  <div class=\"chatBoxStatic__messageReceived speech-bubble\">\r\n                     <p class=\"chatBoxStatic__messageText\">" + element.messageText + "<\/p>\r\n                  <\/div>\r\n               <\/div>"
        }

        messageContainer.appendChild(newSpeechBubble);
    }
    )

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

    if(!validateMessage(message)){
        return;
    }
    
    //interogheaza pentru containeru de mesaje
    const container = document.querySelector(".chatBoxStatic__messageContainer");

    let newSpeechBubble = document.createElement("div");
    newSpeechBubble.innerHTML = " <div class=\"chatBoxStatic__messageMask\">\r\n                  <div class=\"chatBoxStatic__messageSent speech-bubble\">\r\n                     <p class=\"chatBoxStatic__messageText\">" + message + "<\/p>\r\n                  <\/div>\r\n               <\/div>"  


    addSentMessage(idRoom, "555", message);

    //adauga tot elementul cu speech bubble-ul
    container.appendChild(newSpeechBubble);

    //scrolleaza cat de mult se poate in jos ca sa fie vizibil imediat
    container.scrollTop = container.scrollHeight;

    //fa clear la campul de scris mesaj
    messageInput.value = "";
}

async function showChat(){

    const chatElement = document.querySelector(".chatBoxStatic");
    const showButton = document.querySelector(".chatBoxStatic__showButton");

    chatElement.style.display = "block";
    showButton.style.display = "none";

    latestIntervalId = await startUpdatingChatMessages();

    adjustProperWidth();
}

function hideChat(){

    const chatElement = document.querySelector(".chatBoxStatic");
    const showButton = document.querySelector(".chatBoxStatic__showButton");

    chatElement.style.display = "none";
    showButton.style.display = "block";


    //opreste update-ul polled
    chatVisible = false;
    clearInterval(latestIntervalId);
}

function showConvList(){
    const chatListElement = document.querySelector(".chatBoxStatic__recentConversationsList");

    chatListElement.style.display="block";

    convListVisible = true;
}

function hideConvList(){
    const chatListElement = document.querySelector(".chatBoxStatic__recentConversationsList");

    chatListElement.style.display="none";
}