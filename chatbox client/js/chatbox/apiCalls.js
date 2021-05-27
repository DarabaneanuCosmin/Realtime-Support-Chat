import { serverHost, serverPort } from './apiData.js'
import {Message} from './message.js'

export async function createRoomForUser(sId) {
  let request = { sessionId: sId }

  let urlEndpoint = serverHost + ':' + serverPort + '/api/messages/createRoom';

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
      messages.push(new Message(e.idMesaj, e.clientMessage, e.sentByMe, e.sent_message_date));
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
