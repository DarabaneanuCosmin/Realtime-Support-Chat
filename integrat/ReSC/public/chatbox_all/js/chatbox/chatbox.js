

import { validateMessage } from './messageValidator.js'
import { getSessionId } from '../cookies/sessionidReader.js'
import { setCookie } from '../cookies/cookieHelpers.js'
import { Message } from './message.js'
import {
    createRoomForUser, addSentMessage,
    aquireMessageList, updateConsentAnswer,
    getUserPublicData, generateSessionCookie
} from './apiCalls.js'


//adauga event listener pentru enter, daca
//e chat-ul pornit trimite mesaj

addEvents();

let messageList = [];
let chatVisible = false;
let convListVisible = false;
let consentFormVisible = false;
let latestIntervalId = -1;
let sessionId = '';
let idRoom = -1;
let userName = undefined;

const shortPollTime = 1000;


function addEvents() {
    const messageInput = document.querySelector(".chatBoxStatic__inputText");
    const showChatBoxButton = document.querySelector(".chatBoxStatic__showButton");
    const showConvListButton = document.querySelector(".chatBoxStatic__backButton");
    const minimizeButton = document.querySelector(".chatBoxStatic__minimizeButton");
    const messagesButton = document.querySelector(".chatBoxStatic__btnmessages");
    const sendMessageButton = document.querySelector(".chatBoxStatic__sendMessageButton")
    const consentButton = document.querySelector(".chatBoxStatic__consentSubmitButton");
    const popupMinimizeButton = document.querySelector(".chatBoxStaticPopup__minimizeButton")
    
    sendMessageButton.addEventListener("click", (e) => {
       addTypedMessage();
    });

    messageInput.addEventListener("keyup", function (event) {
       if (event.keyCode == 13) {
           addTypedMessage();
       }
    });

    messagesButton.addEventListener("click", (e) => {
       showConvList();
       clearInterval(latestIntervalId);
    });

    minimizeButton.addEventListener("click", (e) => {
       hideChat();
    });

    showChatBoxButton.addEventListener("click", async (e) => {
       if (chatVisible == true) {
           hideChat();
       } else {

           showChat();
           hideConvList();
       }
       chatVisible = !chatVisible;
    });

    showConvListButton.addEventListener("click", (e) => {
       if (convListVisible == true) {
           if (userName != undefined) {
               showChat();
           } else {
               showConsentForm();
           }
           hideConvList();
       }
       convListVisible = !convListVisible;
    });


    consentButton.addEventListener("click", (e) => {
       const consentTextBox = document.querySelector(".chatBoxStatic__userNameConsentBox");
       const message = consentTextBox.value.trim();

       if (validateMessage(message)) {
           userName = message;
           updateConsentAnswer(sessionId, message);

           hideConsentForm();
           showChat();
       }
    });

    popupMinimizeButton.addEventListener("click", (e) => {
       hideConsentForm();
       hideChat();
    });

    document.addEventListener("DOMContentLoaded", async function () {

       let sessionIdValue = getSessionId('PHPSESSID');

       if (sessionIdValue == "") {
           sessionIdValue = getSessionId('session_id');
       }

       if (sessionIdValue == "") {
           let sessionData = await generateSessionCookie();

           sessionIdValue = sessionData.session_id;

           setCookie('session_id', sessionIdValue, 60);
       }

       let userData = await getUserPublicData(sessionIdValue);

       sessionId = sessionIdValue;
       userName = userData.username;

       console.log(userData);
    });

}


async function startUpdatingChatMessages() {


    let idInterval = setInterval(async () => {
        latestIntervalId = idInterval;
        messageList = await aquireMessageList(idRoom, sessionId)
            .then(data => updateMessageBubbles(data))
            .catch(err => console.log(err));
    }, shortPollTime);

   // latestIntervalId = idInterval;
}

function updateMessageBubbles(messages) {

    const messageContainer = document.querySelector('.chatBoxStatic__messageContainer');

    messageContainer.innerHTML = "<div class=\"chatBoxStatic__messageMask\" id=\"chatBoxStatic__dummyMessage\">\r\n                  <div class=\"chatBoxStatic__messageSent speech-bubble\">\r\n                     <p class=\"chatBoxStatic__messageText\">Hello!<\/p>\r\n                  <\/div>\r\n               <\/div>";

    messages.forEach((element) => {
        let newSpeechBubble = document.createElement("div");

        if (element.sentByMe == true) {
            newSpeechBubble.innerHTML = " <div class=\"chatBoxStatic__messageMask\">\r\n                  <div class=\"chatBoxStatic__messageSent speech-bubble\">\r\n                     <p class=\"chatBoxStatic__messageText\">" + element.messageText + "<\/p>\r\n                  <\/div>\r\n               <\/div>"
        } else {
            newSpeechBubble.innerHTML = "<div class=\"chatBoxStatic__messageMask\">\r\n                  <p class=\"chatBoxStatic__senderLabel\">"+ element.senderName + "<\/p>\r\n                  <div class=\"chatBoxStatic__messageReceived speech-bubble\">\r\n                     <p class=\"chatBoxStatic__messageText\">" + element.messageText + "<\/p>\r\n                  <\/div>\r\n               <\/div>"
        }

        messageContainer.appendChild(newSpeechBubble);
    }
    )

}

//Adjusteaza marimea listei de avatare

function adjustProperWidth() {
    let avatare = document.querySelectorAll(".chatBoxStatic__avatarInitials");

    if (avatare.length > 0) {
        let positionInfoAvatar = avatare[0].getBoundingClientRect();
        let widthAvatar = positionInfoAvatar.width;
        let numarAvatare = avatare.length;
        const procent = 0.4;

        let totalWidth = widthAvatar + 5;
        console.log(widthAvatar);
        let totalWidthString;

        if (avatare.length > 1) {
            totalWidth += (numarAvatare - 1) * (1 - procent) * widthAvatar;
        }

        totalWidthString = totalWidth + "px";

        avatare[0].parentElement.style.width = totalWidthString;
        console.log(totalWidthString);
    }
}


function addTypedMessage() {

    const messageInput = document.querySelector(".chatBoxStatic__inputText");
    //fa rost de mesaj din input box
    const message = messageInput.value.trim();

    if (!validateMessage(message) || userName == undefined) {
        return;
    }

    //interogheaza pentru containeru de mesaje
    const container = document.querySelector(".chatBoxStatic__messageContainer");

    let newSpeechBubble = document.createElement("div");
    newSpeechBubble.innerHTML = " <div class=\"chatBoxStatic__messageMask\">\r\n                  <div class=\"chatBoxStatic__messageSent speech-bubble\">\r\n                     <p class=\"chatBoxStatic__messageText\">" + message + "<\/p>\r\n                  <\/div>\r\n               <\/div>"

    addSentMessage(idRoom, sessionId, message);

    //adauga tot elementul cu speech bubble-ul
    container.appendChild(newSpeechBubble);

    //scrolleaza cat de mult se poate in jos ca sa fie vizibil imediat
    container.scrollTop = container.scrollHeight;

    //fa clear la campul de scris mesaj
    messageInput.value = "";
}

async function showChat() {

    const chatElement = document.querySelector(".chatBoxStatic");
    const showButton = document.querySelector(".chatBoxStatic__showButton");

    chatElement.style.display = "block";
    showButton.style.display = "none";

    if (userName == undefined) {
        showConsentForm();
        return;
    }

    adjustProperWidth();

    idRoom = await createRoomForUser(sessionId);

    console.log(idRoom);

    startUpdatingChatMessages();

}

function hideChat() {

    const chatElement = document.querySelector(".chatBoxStatic");
    const showButton = document.querySelector(".chatBoxStatic__showButton");

    chatElement.style.display = "none";
    showButton.style.display = "block";


    //opreste update-ul polled
    chatVisible = false;
    clearInterval(latestIntervalId);
}

function showConsentForm() {
    const chatListElement = document.querySelector(".chatBoxStatic__popup");

    chatListElement.style.display = "block";

    consentFormVisible = true;
}

function hideConsentForm() {
    const chatListElement = document.querySelector(".chatBoxStatic__popup");

    chatListElement.style.display = "none";

    consentFormVisible = true;
}

function showConvList() {
    const chatListElement = document.querySelector(".chatBoxStatic__recentConversationsList");

    chatListElement.style.display = "block";

    convListVisible = true;
}

function hideConvList() {
    const chatListElement = document.querySelector(".chatBoxStatic__recentConversationsList");

    chatListElement.style.display = "none";
}