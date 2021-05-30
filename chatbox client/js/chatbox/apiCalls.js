import { serverHost, serverPort } from './apiData.js'
import {Message} from './message.js'
import {Room} from './room.js'

export async function createRoomForUser(sId) {
  let request = { sessionId: sId }

  let urlEndpoint = serverHost + ':' + serverPort + '/api/messages/createRoomEnhanced';

  let idRoom = -1;

  console.log(request);
  console.log(urlEndpoint);

  await postData(urlEndpoint, request).then((data) => {
    console.log(data);
    idRoom = data.idRoom;
  }).catch(err => createRoomForUser(sId));

  console.log(idRoom + ' hello');


  return idRoom;
}

export async function aquireMessageList(idRoom, sId) {
  let request = {}
  let messages = [];
  let urlEndpoint = serverHost + ':' + serverPort + '/api/messages/' + sId + '/' + idRoom + '/';

  console.log(urlEndpoint);
  await getData(urlEndpoint, request).then(data => {
    console.log(data);
    data.forEach( (e) => {
      messages.push(new Message(e.idMesaj, e.clientMessage, e.sentByMe, e.sent_message_date, e.username));
    });
  });
  console.log(messages);
  return messages;
}


export async function addSentMessage(idRoom, sId, message) {

  const request = {clientMessage: message}
  console.log(idRoom);

  let urlEndpoint = serverHost + ':' + serverPort + '/api/messages/' + idRoom + '/' + sId + '/';

  console.log(urlEndpoint);

  await postData(urlEndpoint, request).then((data) => {
    idRoom = data.idRoom;
  });


  return idRoom;
}

export async function updateConsentAnswer(sId, username) {

  const request = {session_id: sId,
  username}

  console.log(sId);
  console.log(username);

  let urlEndpoint = serverHost + ':' + serverPort + '/api/updateSession';

  console.log(urlEndpoint);

  await putData(urlEndpoint, request).then((data) => {
    console.log(data);
  });
}

export async function generateSessionCookie() {

  let urlEndpoint = serverHost + ':' + serverPort + '/api/generateSession';
  let sessionData = '';

  console.log(urlEndpoint);

  await postData(urlEndpoint, {}).then((data) => {
    sessionData = data;
    console.log(data);
  });

  return sessionData;
}



export async function getUserPublicData(sId) {

  console.log(sId);

  let urlEndpoint = serverHost + ':' + serverPort + '/api/userData/' + sId;

  console.log(urlEndpoint);

  return await getData(urlEndpoint);
}

export async function fetchRoomsList(sId){
  let request = {};
  let rooms = [];
  let urlEndpoint = serverHost + ':' + serverPort + '/api/listRooms/' + sId;

  console.log(urlEndpoint);
  await getData(urlEndpoint, request).then(data => {
    console.log(data);
    data.forEach( (e) => {
      rooms.push(new Room(e.adminName, e.idAssignedAdmin, e.idRoom, e.lastMessage, e.roomName, e.roomParticipantsCount));
    });
  });

  console.log(rooms);
  return rooms;
}

export async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });

  return response.json();
}

export async function getData(url = '') {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return response.json();
}

export async function putData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });

  return response.json();
}
