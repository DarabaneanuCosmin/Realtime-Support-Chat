const { getPostData } = require('../utils/utils.js');


const { createPrivateRoomAndAddToGlobal,
    listRooms,
    relayRoomData,
    createRoom,
    getAllRooms,
    addAdminToRoom } = require('../service/RoomsService.js');

async function postCreatePrivateRoomAndAddToGlobal(req, res) {

    const body = await getPostData(req);
    var parseMessage = JSON.parse(body);

    createPrivateRoomAndAddToGlobal(req, res, parseMessage.sessionId);
}

async function postCreateRoom(req, res) {
    //createlobby  cu idLobby = ...
    const body = await getPostData(req);
    var parseMessage = JSON.parse(body);


    createRoom(req, res, parseMessage.sessionId);
}

async function postAddAdminToRoom(req, res) {
    const idRoom = req.url.split('/')[3];
    const sessionId = req.url.split('/')[4];

    addAdminToRoom(req, res, idRoom, sessionId);
}

async function getListRooms(req, res) {
    const idUser = req.url.split('/')[3];

    listRooms(req, res, idUser);
}


async function getRelayRoomData(req, res) {
    const idRoom = req.url.split('/')[3];

    relayRoomData(req, res, idRoom);
}

async function getAquireAllRooms(req, res) {
    getAllRooms(req, res);
}

module.exports = {
    postCreatePrivateRoomAndAddToGlobal,
    postCreateRoom,
    postAddAdminToRoom,
    getListRooms,
    getRelayRoomData,
    getAquireAllRooms
}