var roomID;
var userID;
var lastMessageID;
let emojiMap = new Map();
emojiMap.set('$happy', '&#x1F600');
emojiMap.set('$love', '&#x1F970');
emojiMap.set('$flower', '&#x1F33C');
emojiMap.set('$bread', '&#x1F35E');
emojiMap.set('$earth', '&#x1F30D');
emojiMap.set('$automobile', '&#x1F697');


async function getConverastions() {
    let users = await getRoomsAndUsers();
    var ssid = getCookie('PHPSESSID');
    let idUser = await getUserId(ssid);

    document.getElementById('conversations').innerHTML = `<p class="message">Conversations</p>
       <div class = "panel_conversation">
       <img class ="panel__image" alt="photo" src ="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80 ">
           <div class ="paneldetails"> 
               <span class="chat__message"> 
               Global room
               </span> 
           </div> 
         
           <button class="btn__room" onclick="setGlobalRoom(` + `)""> Chat </button>
            <button class="btn__room btn-ext"   onclick="exitConversation(` + `)"> Exit </button>
   </div>
       `;
    for (user in users) {
        if (users[user].error == false && users[user].idUser != idUser.idUser && users[user].idRoom != -999) {
            let userName = await getUserName(users[user].idUser);
            let localroomID = users[user].idRoom;
            let localuserID = users[user].idUser;
            var div = document.createElement('a');

            div.innerHTML = `<div class = "panel_conversation">
                    <img class ="panel__image" alt="photo" src ="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80 ">
                        <div class ="paneldetails"> 
                            <span class="chat__message"> 
                            ` + userName.username + `
                            </span> 
                        </div> 
                       
                        <button class="btn__room" onclick="setChatParams(` + localuserID + `,` + localroomID + `)"> Chat </button>
                        <button class="btn__room btn-ext"   onclick="exitConversation(` + `)"> Exit </button>
                        
                </div>`
            document.getElementById('conversations').appendChild(div);
        }

    }
    setTimeout(getConverastions, 10000);
};
getConverastions();

function exitConversation() {
    document.location.reload(true);
}

async function setGlobalRoom() {
    localroomID = -999;
    var ssid = getCookie('PHPSESSID');
    let idUser = await getUserId(ssid);

    setChatParams(idUser.idUser, localroomID);
}

async function setChatParams(uid, rid) {

    if (window.screen.width <= 630) {

        document.getElementById("conversations").style['display'] = 'none';

        document.getElementById("read__messages").style['display'] = 'block';
        document.getElementById("read__messages").style.width = '100%';

        var btn = document.createElement('button');
        btn.setAttribute('id', 'back-btn');
        btn.innerHTML = "BACK";
        btn.setAttribute('onclick', 'exitConversation()');
        document.getElementById("read__messages").appendChild(btn);
    }
    if (roomID != undefined) {
        alert("Ai uitat sa inchizi conversatia! ");
        document.location.reload(true);
    }

    lastMessageID = 0;

    roomID = rid;
    userID = uid;

    openChat();
}

async function openChat() {
    var ssid = getCookie('PHPSESSID');
    if (document.getElementById('messagesCenter') != null) {

        document.getElementById('adminSendMessage').style['display'] = 'flex';
        let textArea = document.querySelector("#adminMessage");

        textArea.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                sendMessageToDB(e.target.value);
                document.getElementById('adminMessage').value = "";

            }
        });
        document.getElementById('messagesCenter').innerHTML = ".";

        var ssid = getCookie('PHPSESSID');
        var oldMessages = await getMessages(ssid, roomID);
        await updateMessages(oldMessages);

        let adminAdded = await addAdminToRoom(roomID, ssid).then(async(result) => { await conversation() });

    }
}

async function conversation() {
    var parse = "";
    var message = await getNewMessage();
    if (message.error == false) {
        var ok = 0;
        var newText = "";
        parse = message.clientMessage.split(/\s+/);
        for (var it = 0; it < parse.length; it++) {
            ok = 0;
            if (parse[it][0] == '$') {
                for (let [key, value] of emojiMap) {
                    if (parse[it] == key) {
                        newText += value;
                        newText += " ";
                        ok = 1;
                        break;
                    }
                }
                if (ok == 0) {
                    newText += parse[it];
                    newText += " ";
                }
            } else {
                newText += parse[it];
                newText += " ";
            }

        }
        parse = "";
        let userName = await getUserName(message.idUser);
        if (message.idRoom != -999) {
            if (message.idUser == userID) {
                //client message
                lastMessageID = message.idMesaj;

                var div = document.createElement('div');
                div.innerHTML = `<div class="panel__incomingMessages">
                <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" class="panel__img">
                <div class="panel_details">
                    <p class="p__d">
                    ` + `<u>` + userName.username + `</u> : ` + sanitizeHTML(newText) + `
                    </p>
                </div>
            </div>`;
                document.getElementById('messagesCenter').appendChild(div);
            } else {
                lastMessageID = message.idMesaj;
                var div = document.createElement('div');
                div.innerHTML = ` <div class="panel__output">
                <div class="panel_details">
                <p class="p__details">` + `<u>` + userName.username + `</u> : ` + sanitizeHTML(newText) + `</p>
                </div>
                </div>`;
                document.getElementById('messagesCenter').appendChild(div);
            }
        } else {
            if (message.idUser != userID) {
                //client message
                lastMessageID = message.idMesaj;
                var div = document.createElement('div');
                div.innerHTML = `<div class="panel__incomingMessages">
                <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" class="panel__img">
                <div class="panel_details">
                    <p class="p__d">
                    ` + `<u>` + userName.username + `</u> : ` + newText + `
                    </p>
                </div>
            </div>`;
                document.getElementById('messagesCenter').appendChild(div);
            } else {
                lastMessageID = message.idMesaj;
                var div = document.createElement('div');
                div.innerHTML = ` <div class="panel__output">
                <div class="panel_details">
                <p class="p__details">` + `<u>` + userName.username + `</u> : ` + newText + `</p>
                </div>
                </div>`;
                document.getElementById('messagesCenter').appendChild(div);
            }
        }
    }


    setTimeout(conversation, 1000);
}

async function updateMessages(messages) {
    for (var index = 0; index < messages.length; index++) {
        var ok = 0;
        var newText = "";
        var parse = messages[index].clientMessage.split(/\s+/);
        for (var it = 0; it < parse.length; it++) {
            if (parse[it][0] == '$') {
                for (let [key, value] of emojiMap) {
                    if (parse[it] == key) {
                        newText += value;
                        newText += " ";
                        ok = 1;
                        break;
                    }
                }
                if (ok == 0) {
                    newText += parse[it];
                    newText += " ";
                }
            } else {
                newText += parse[it];
                newText += " ";
            }

        }
        let userName = await getUserName(messages[index].idUser);
        lastMessageID = messages[index].idMesaj;
        if (messages[index].idRoom != -999) {
            if (messages[index].idUser == userID) {
                //client message
                var div = document.createElement('div');
                div.innerHTML = `<div class="panel__incomingMessages">
            <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" class="panel__img">
            <div class="panel_details">
                <p class="p__d">
                ` + `<u>` + userName.username + `</u> : ` + newText + `
                </p>
            </div>
        </div>`;
                document.getElementById('messagesCenter').appendChild(div);
            } else {
                var div = document.createElement('div');
                div.innerHTML = ` <div class="panel__output">
            <div class="panel_details">
            <p class="p__details">` + `<u>` + userName.username + `</u> : ` + newText + `</p>
            </div>
            </div>`;
                document.getElementById('messagesCenter').appendChild(div);
            }
        } else {
            if (messages[index].idUser != userID) {
                //client message
                var div = document.createElement('div');
                div.innerHTML = `<div class="panel__incomingMessages">
            <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" class="panel__img">
            <div class="panel_details">
                <p class="p__d">
                ` + `<u>` + userName.username + `</u> : ` + newText + `
                </p>
            </div>
        </div>`;
                document.getElementById('messagesCenter').appendChild(div);
            } else {
                var div = document.createElement('div');
                div.innerHTML = ` <div class="panel__output">
            <div class="panel_details">
            <p class="p__details">` + `<u>` + userName.username + `</u> : ` + newText + `</p>
            </div>
            </div>`;
                document.getElementById('messagesCenter').appendChild(div);
            }
        }
    }

}


async function getTextFromAdmin() {
    var message = document.getElementById('adminMessage').value;
    var response = await sendMessageToDB(message);
    document.getElementById('adminMessage').value = "";
    /*var confirm = document.createElement('p');
    confirm.setAttribute('id','confirmMessage');
    confirm.innerHTML= response.message;
    document.getElementById('adminSendMessage').appendChild(confirm);*/
}

async function getNewMessage() {

    let url = 'http://localhost:5000/api/message/' + roomID + '/' + lastMessageID + '/';
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let data = await response.json();

    return data;
}

async function sendMessageToDB(text) {
    var sessionID = getCookie('PHPSESSID');
    var message = { "clientMessage": text.trim() };
    let url = 'http://localhost:5000/api/messages/' + roomID + '/' + sessionID + '/';
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    });
    let data = await response.json();
    return data;
}

async function addAdminToRoom(roomID, sessionID) {
    let url = 'http://localhost:5000/api/admin/' + roomID + '/' + sessionID + '/';
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
    });
    let data = await response.json();

    return await data;
}

function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [k, v] = el.split('=');
        cookie[k.trim()] = v;
    })
    return cookie[name];
}

async function getRoomsAndUsers() {
    const response = await fetch("http://localhost:5000/api/rooms", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
    });
    let data = await response.json();
    return data;
}

async function getMessages(sessionID, roomID) {
    let url = `http://localhost:5000/api/messages/` + sessionID + `/` + roomID + `/`;
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
    });
    let data = await response.json();
    return data;
}

async function getUserName(userid) {
    let url = 'http://localhost:5000/api/username/session/' + userid;
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
    });
    let data = await response.json();
    return data;
}
async function getUserId(sessionId) {
    let url = 'http://localhost:5000/api/user/id/' + sessionId;
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
    });
    let data = await response.json();
    return data;
}



function sanitizeHTML(text) {
    var element = document.createElement('div');
    element.innerText = text;
    return element.innerHTML;
}
