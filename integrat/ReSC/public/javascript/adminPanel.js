var roomID;
var userID;

async function getConverastions(){
    let users = await getRoomsAndUsers();
    document.getElementById('conversations').innerHTML=`<p class="message">Conversations</p>
    <div class="search">

        <span class="text">Select an user to start chat</span>
        <div class="panel__srcIntro">
            <input type="text" placeholder="Enter name to search...">
            <button class="panel__searchButton" onclick = "getUserRoomByName()">
            </button>

        </div>
    </div>`;
    for(user in users){
        if(users[user].error == false){
            let userName = await getUserNames(users[user].idUser);
            roomID = users[user].idRoom;
            userID = users[user].idUser;
            var div = document.createElement('a');
            
            div.innerHTML = `<div class = "panel_conversation">
                    <img class ="panel__image" src ="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80 ">
                        <div class ="paneldetails"> 
                            <span> 
                            `+ userName.username +`
                            </span> 
                        </div> 
                        <div class="panel__status-dot"> 
                            <span class="circle"> </span> 
                        </div> 
                        <button onclick="openChat(`+ userID +`,` + roomID +`)"> Chat </button>
                </div>`
            document.getElementById('conversations').appendChild(div);
        }
    }
    setTimeout(getConverastions,10000);
}; getConverastions();

async function openChat(){
    var ssid = getCookie('PHPSESSID');

    if(document.getElementById('messagesCenter')!=null){

        document.getElementById('messagesCenter').innerHTML=".";

        let adminAdded = await addAdminToRoom(roomID,ssid);
        
        let messages = await getMessages(ssid,roomID);

        for(message in messages){
            if(messages[message].idUser==userID){
                //client message
                var div = document.createElement('div');
                div.innerHTML=`<div class="panel__incomingMessages">
                <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" class="panel__img">
                <div class="panel_details">
                    <p class="p__d">
                    `+ messages[message].clientMessage +`
                    </p>
                </div>
            </div>`;
            document.getElementById('messagesCenter').appendChild(div);
            }else{
                var div = document.createElement('div');
                div.innerHTML=` <div class="panel__output">
                <div class="panel_details">
                <p class="p__details">`+ messages[message].clientMessage +`</p>
                </div>
                </div>`;
                document.getElementById('messagesCenter').appendChild(div);
            }
        }
    }
    setTimeout(openChat,10500);
}

async function getTextFromAdmin(){
    var message = document.getElementById('adminMessage').value;
    var response = await sendMessageToDB(message);
    document.getElementById('adminMessage').value="";
}

async function sendMessageToDB(text){
    var sessionID = getCookie('PHPSESSID');
    var message =  {"clientMessage":text};
    let url = 'http://localhost:5000/api/messages/'+roomID+'/'+sessionID+'/';
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

async function addAdminToRoom(roomID, sessionID){
    let url = 'http://localhost:5000/api/admin/'+roomID+'/'+sessionID+'/';
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
    });
    let data = await response.json();
    return data;
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

async function getMessages(sessionID,roomID){
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

async function getUserNames(userid){
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

