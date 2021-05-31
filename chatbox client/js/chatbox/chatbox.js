

import { validateMessage } from './messageValidator.js'
import { getSessionId } from '../cookies/sessionidReader.js'
import { setCookie } from '../cookies/cookieHelpers.js'
import { Message } from './message.js'
import {
    createRoomForUser, addSentMessage,
    aquireMessageList, updateConsentAnswer,
    getUserPublicData, generateSessionCookie,
    fetchRoomsList, fetchRoomData
} from './apiCalls.js'


//adauga event listener pentru enter, daca
//e chat-ul pornit trimite mesaj

addEvents();

let messageList = [];
let roomList = [];
let chatVisible = false;
let convListVisible = false;
let consentFormVisible = false;
let currentRoomData = {};
let sessionId = '';
let idRoom = -1;
let userName = undefined;
let firstTimeToUpdate = true;

let latestIntervalId = -1;


const globalRoomConst = -999;
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

        //incepe prin a citi PHPSESSID, daca site-ul pe care integram chatboxul nu il are
        // continua sa citeste session_id, un cookie care este generat de API
        //CAND nu exista cookie generat de PHP = PHPSESSID pentru a trackui useru
        //in continuare si foloseste-l peste tot in toate requesturile pentru 
        //tracking si autorizare actiuni

        if (sessionIdValue === "") {
            sessionIdValue = getSessionId('session_id');
        }

        if (sessionIdValue === "") {
            generateSessionCookie()
                .then((sessionIdData) => {
                    //salveaza cookie-ul in browser ( nu s-a gasit
                    // PHPSESSION ID SI SE cere alt cookie)
                    sessionIdValue = sessionIdData.session_id;
                    setCookie('session_id', sessionIdValue, 60);
                });
        }

        await getUserPublicData(sessionIdValue)
            .then(userData => {
                sessionId = sessionIdValue;
                userName = userData.username;
                console.log(userData);
            }).catch(async (err) => {
                console.log(" Connection to api dropped : Couldn't aquire userData!");
            });
    });
}


function startUpdatingChat() {


    firstTimeToUpdate = true;
    
    aquireMessagesAndUpdateChatData();

    let idInterval = setInterval(() => {
        aquireMessagesAndUpdateChatData(idInterval, shortPollTime);
    }, shortPollTime);

    return idInterval;
}

async function aquireMessagesAndUpdateChatData(idInterval){

        aquireMessageList(idRoom, sessionId)
            .then(data => {
                data.sort((a, b) => {
                    if (a.idMessage < b.idMessage) {
                        return -1;
                    }

                    if (a.idMessage > b.idMessage) {
                        return 1;
                    }

                    return a.idMessage === b.idMessage;
                });

                messageList = data;

                updateMessageBubbles(data)
            }).catch(err => console.log(err));
        fetchRoomData(idRoom).then((data) =>{
            updateHeaderInformation(data);
        });
    return latestIntervalId;
}


function updateMessageBubbles(messages) {

    const messageContainer = document.querySelector('.chatBoxStatic__messageContainer');

    messageContainer.innerHTML = "<div class=\"chatBoxStatic__messageMask\" id=\"chatBoxStatic__dummyMessage\">\r\n                  <div class=\"chatBoxStatic__messageSent speech-bubble\">\r\n                     <p class=\"chatBoxStatic__messageText\">Hello!<\/p>\r\n                  <\/div>\r\n               <\/div>";

    messages.forEach((element) => {
        let newSpeechBubble = document.createElement("div");

        if (element.sentByMe == true) {
            newSpeechBubble.innerHTML = " <div class=\"chatBoxStatic__messageMask\">\r\n                  <div class=\"chatBoxStatic__messageSent speech-bubble\">\r\n                     <p class=\"chatBoxStatic__messageText\">" + element.messageText + "<\/p>\r\n                  <\/div>\r\n               <\/div>"
        } else {
            newSpeechBubble.innerHTML = "<div class=\"chatBoxStatic__messageMask\">\r\n                  <p class=\"chatBoxStatic__senderLabel\">" + element.senderName + "<\/p>\r\n                  <div class=\"chatBoxStatic__messageReceived speech-bubble\">\r\n                     <p class=\"chatBoxStatic__messageText\">" + element.messageText + "<\/p>\r\n                  <\/div>\r\n               <\/div>"
        }

        messageContainer.appendChild(newSpeechBubble);
    }
    )

    if(firstTimeToUpdate == true){
        //scroleaza pana jos
        const messageContainer = document.querySelector('.chatBoxStatic__messageContainer');

        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    firstTimeToUpdate = false;

}

function setRoomsAsConversationListEntries(rooms) {
    const convListContainer = document.querySelector(".chatBoxStatic__conversationList");


    convListContainer.innerHTML = "";

    roomList = rooms;

    rooms.forEach((r) => {
        let newListViewItem = document.createElement("div");

        if (r.idRoom == globalRoomConst) {

            newListViewItem.innerHTML =
                `<div class="chatBoxStatic__conversation">
            <div class="chatBoxStatic__recentConversationAvatar">
               <img src="nd-initials.jpg" alt="Initials">
            </div>

            <div class="chatBoxStatic__recentContactInfo">
               <p class="chatBoxStatic__conversationName"> ` + r.roomName + `</p>
               <p class="chatBoxStatic__recentLastMessage"> `+ r.lastMessage + `</p>
            </div>
            </div>`
        } else {
            if (r.adminName != "") {
                newListViewItem.innerHTML =
                    `<div class="chatBoxStatic__conversation">
            <div class="chatBoxStatic__recentConversationAvatar">
               <img src="nd-initials.jpg" alt="Initials">
            </div>

            <div class="chatBoxStatic__recentContactInfo">
               <p class="chatBoxStatic__conversationName"> ` + r.adminName + `</p>
               <p class="chatBoxStatic__recentLastMessage"> `+ r.lastMessage + `</p>
            </div>
            </div>`
            } else {
                newListViewItem.innerHTML =
                    `<div class="chatBoxStatic__conversation">
            <div class="chatBoxStatic__recentConversationAvatar">
               <img src="nd-initials.jpg" alt="Initials">
            </div>

            <div class="chatBoxStatic__recentContactInfo">
               <p class="chatBoxStatic__conversationName"> Private support chat </p>
               <p class="chatBoxStatic__recentLastMessage"> `+ r.lastMessage + `</p>
            </div>
            </div>`
            }
        }

        newListViewItem.addEventListener("click",
            () => {
                proceedFromConversationListToRoom(r);
            });

        convListContainer.appendChild(newListViewItem);

    });
}


function proceedFromConversationListToRoom(newRoom) {
    idRoom = newRoom.idRoom;
    currentRoomData = newRoom;

    if (convListVisible == true) {
        if (userName != undefined) {
            showChat();
        } else {
            showConsentForm();
        }
        hideConvList();
    }
}

//Adjusteaza marimea listei de avatare


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
    const container = document.querySelector(".chatBoxStatic__messageContainer");

    container.innerHTML = "";

    chatElement.style.display = "block";
    showButton.style.display = "none";

    if (userName == undefined) {
        showConsentForm();
        return;
    }

    //adjustProperWidth();

    if (idRoom == -1) {
        idRoom = await createRoomForUser(sessionId);
        currentRoomData = await fetchRoomData(idRoom);
    }

    updateHeaderInformation(currentRoomData);

    console.log(idRoom);

    if(latestIntervalId != undefined){
        clearInterval(latestIntervalId);
    }

    latestIntervalId = startUpdatingChat();
    console.log('Interval set!');
}

function updateHeaderInformation(roomData) {
    if (roomData === {}) {
        return;
    }

    //chatBoxStatic__destinatar
    //chatBoxStatic__username
    //chatBoxStatic__helperRank
    const avatarList = document.querySelector(".chatBoxStatic__avatarList");
    const destinatar = document.querySelector(".chatBoxStatic__destinatar");
    const subscript = document.querySelector(".chatBoxStatic__helperRank");

    if (roomData.adminName != '' && roomData.adminName != undefined) {
        destinatar.innerHTML = `Chatting with
        <span class="chatBoxStatic__username">` + roomData.adminName;

        subscript.innerHTML = `Support team senior`;
    } else {
        destinatar.innerHTML = roomData.roomName || 'Ask us any question';
        subscript.innerHTML = `Support chat`;
    }

    avatarList.innerHTML = "";

    let htmlAvatar = 
    `<div class="chatBoxStatic__avatarInitials">
        <img src="https://image.shutterstock.com/image-vector/nd-dn-initial-letter-logo-260nw-1673509756.jpg"
        alt="ND">
    </div> `;
    console.log("Room count:" +  roomData.roomParticipantsCount);
    avatarList.innerHTML = htmlAvatar
     .repeat(roomData.roomParticipantsCount);
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

async function showConvList() {
    const chatListElement = document.querySelector(".chatBoxStatic__recentConversationsList");

    chatListElement.style.display = "block";

    setRoomsAsConversationListEntries(await fetchRoomsList(sessionId));

    convListVisible = true;
}

function hideConvList() {
    const chatListElement = document.querySelector(".chatBoxStatic__recentConversationsList");

    chatListElement.style.display = "none";
}