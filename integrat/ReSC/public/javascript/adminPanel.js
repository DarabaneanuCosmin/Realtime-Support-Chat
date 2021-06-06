var roomID;
var userID;
var lastMessageID;


async function getConverastions() {
    let users = await getRoomsAndUsers();
    var ssid = getCookie('PHPSESSID');
    let idUser = await getUserId(ssid);

    document.getElementById('conversations').innerHTML = `<p class="message">Conversations</p>
    <div class="search">

        <span class="text">Select an user to start chat</span>
        <div class="panel__srcIntro">
            <input type="text" placeholder="Enter name to search...">
            <button class="panel__searchButton" onclick = "getUserRoomByName()">
            </button>
            </div>
            
       </div>
       <div class = "panel_conversation">
       <img class ="panel__image" src ="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80 ">
           <div class ="paneldetails"> 
               <span> 
               Global room
               </span> 
           </div> 
         
           <button onclick="setGlobalRoom(` + `)"> Chat </button>
   </div>
       `;
    for (user in users) {
        console.log(users[user].idUser);
        console.log("hmm", idUser.idUser);
        if (users[user].error == false && users[user].idUser != idUser.idUser) {
            let userName = await getUserNames(users[user].idUser);
            let localroomID = users[user].idRoom;
            let localuserID = users[user].idUser;
            var div = document.createElement('a');

            div.innerHTML = `<div class = "panel_conversation">
                    <img class ="panel__image" src ="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80 ">
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
        console.log("before update")
        var oldMessages = await getMessages(ssid, roomID);
        console.log("updateMESSAGES");
        updateMessages(oldMessages);

        console.log("ADMINTOROOM");
        let adminAdded = await addAdminToRoom(roomID, ssid).then((result) => conversation());

    }
}

async function conversation() {
    var message = await getNewMessage();
    if (message.error == false) {
        if (message.idRoom != -999) {
            if (message.idUser == userID) {
                //client message
                lastMessageID = message.idMesaj;
                var div = document.createElement('div');
                div.innerHTML = `<div class="panel__incomingMessages">
                <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" class="panel__img">
                <div class="panel_details">
                    <p class="p__d">
                    ` + message.clientMessage + `
                    </p>
                </div>
            </div>`;
                document.getElementById('messagesCenter').appendChild(div);
            } else {
                lastMessageID = message.idMesaj;
                var div = document.createElement('div');
                div.innerHTML = ` <div class="panel__output">
                <div class="panel_details">
                <p class="p__details">` + message.clientMessage + `</p>
                </div>
                </div>`;
                document.getElementById('messagesCenter').appendChild(div);
            }
        }else{
            if (message.idUser != userID) {
                //client message
                lastMessageID = message.idMesaj;
                var div = document.createElement('div');
                div.innerHTML = `<div class="panel__incomingMessages">
                <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" class="panel__img">
                <div class="panel_details">
                    <p class="p__d">
                    ` + message.clientMessage + `
                    </p>
                </div>
            </div>`;
                document.getElementById('messagesCenter').appendChild(div);
            } else {
                lastMessageID = message.idMesaj;
                var div = document.createElement('div');
                div.innerHTML = ` <div class="panel__output">
                <div class="panel_details">
                <p class="p__details">` + message.clientMessage + `</p>
                </div>
                </div>`;
                document.getElementById('messagesCenter').appendChild(div);
            }
        }
    }


    setTimeout(conversation, 1000);
}

async function updateMessages(messages) {
    messages.forEach((message) => {
        lastMessageID = message.idMesaj;
        if (message.idRoom != -999) {
            if (message.idUser == userID) {
                //client message
                var div = document.createElement('div');
                div.innerHTML = `<div class="panel__incomingMessages">
            <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" class="panel__img">
            <div class="panel_details">
                <p class="p__d">
                ` + message.clientMessage + `
                </p>
            </div>
        </div>`;
                document.getElementById('messagesCenter').appendChild(div);
            } else {
                var div = document.createElement('div');
                div.innerHTML = ` <div class="panel__output">
            <div class="panel_details">
            <p class="p__details">` + message.clientMessage + `</p>
            </div>
            </div>`;
                document.getElementById('messagesCenter').appendChild(div);
            }
        } else {
            if (message.idUser != userID) {
                //client message
                var div = document.createElement('div');
                div.innerHTML = `<div class="panel__incomingMessages">
            <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" class="panel__img">
            <div class="panel_details">
                <p class="p__d">
                ` + message.clientMessage + `
                </p>
            </div>
        </div>`;
                document.getElementById('messagesCenter').appendChild(div);
            } else {
                var div = document.createElement('div');
                div.innerHTML = ` <div class="panel__output">
            <div class="panel_details">
            <p class="p__details">` + message.clientMessage + `</p>
            </div>
            </div>`;
                document.getElementById('messagesCenter').appendChild(div);
            }
        }
    });
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
    console.log(roomID, lastMessageID);
    let url = 'http://localhost:5000/api/message/' + roomID + '/' + lastMessageID + '/';
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let data = await response.json();
    console.log(data);
    return data;
}

async function sendMessageToDB(text) {
    var sessionID = getCookie('PHPSESSID');
    var message = { "clientMessage": text };
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

async function getUserNames(userid) {
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