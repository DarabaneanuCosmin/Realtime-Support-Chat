const http = require('http');
const {
    getUsernameFromSessionTableById,
    getOneMessage,
    addAdminToRoom,
    getUserId
} = require('./service/service-info.js');
const {
    createUserTable,
    createRoomTable,
    createMessagesTable,
    createSessionTable,
    createJoinTable,
    createAdminTable,
    createUserIdSequence,
    createMessageIdSequence,
    insertGlobalMessagesRoom,
    addAdmin
} = require('./mysqldb/connection');


const {
    createPrivateRoomAndAddToGlobal,
    listRooms,
    relayRoomData
} = require('./service/RoomsService.js');

const Message = require('./utils/messages.js');

const {
    createRoom,
    addNewMessages,
    getUserBasicData,
    createSession,
    fetchMessages,
    getSession,
    updateSessionUserName,
    generateSessionCookie,
    getAllRooms,
    addNewMessage
} = require('./service/service.js');

const { getPostData } = require('./utils/utils.js');
createUserTable();
createRoomTable();
createMessagesTable();
createSessionTable();
createJoinTable();
createAdminTable();
createUserIdSequence();
createMessageIdSequence();
insertGlobalMessagesRoom();
addAdmin();

const server = http.createServer(async(req, res) => {

    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT",
        "Access-Control-Max-Age": 2592000, // 30 days
        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    };


    if (req.url.match(/\/api\/messages\/([a-z A-Z 0-9 -]+)\/([a-z A-Z 0-9 -]+)/) &&
        req.method === 'GET') {
        let idRoom = req.url.split('/')[4];
        let idUser = req.url.split('/')[3];

        fetchMessages(req, res, idRoom, idUser);
    } else if (req.url === '/api/session' && req.method === 'POST') {
        //adaugam o sesiune noua
        const body = await getPostData(req);
        var parseMessage = JSON.parse(body);
        createSession(req, res, parseMessage.session_id, parseMessage.idUser);
    } else if (req.url === '/api/updateSession' && req.method === 'PUT') {
        const body = await getPostData(req);
        var parsedMessage = JSON.parse(body);

        updateSessionUserName(req, res, parsedMessage.session_id,
            parsedMessage.username);
    } else if (req.url.match(/\/api\/userData\/([a-z A-Z 0-9 -]+)/) && req.method === 'GET') {

        let session_id = req.url.split('/')[3];

        getUserBasicData(req, res, session_id);
    }  else if (req.url === '/api/messages/createRoom' && req.method === 'POST') {
        //createlobby  cu idLobby = ...
        const body = await getPostData(req);
        var parseMessage = JSON.parse(body);


        createRoom(req, res, parseMessage.sessionId);

    }  else if (req.url.match(/\/api\/messages\/([a-z A-Z 0-9 -]+)\/([a-z A-Z 0-9 -]+)/) &&
        req.method === 'POST') {
        //url:/api/messages/:idRoom/:idClient1 si metoda:POST - 
        //adaugam in Room-ul idRoom mesajele noi trimise de catre idClient

        const idRoom = req.url.split('/')[3]; //
        const sessionId = req.url.split('/')[4];

        var body = await getPostData(req);

        var parseMessage = JSON.parse(body);

        //addNewMessages(req, res, idRoom, parseMessage.clientMessage, sessionId);
        addNewMessage(req, res, idRoom, parseMessage.clientMessage, sessionId);

    } else if (req.url == '/api/rooms' &&
        req.method === 'GET') {
        getAllRooms(req, res);

    } else if (req.url.match(/\/api\/username\/session\/([a-z A-Z 0-9 -]+)/) &&
        req.method === 'GET') {
        const idUser = req.url.split('/')[4];

        getUsernameFromSessionTableById(req, res, idUser)
    } else if (req.url.match(/\/api\/admin\/([a-z A-Z 0-9 -]+)\/([a-z A-Z 0-9 -]+)/) && req.method === 'POST') {
        const idRoom = req.url.split('/')[3];
        const sessionId = req.url.split('/')[4];

        addAdminToRoom(req, res, idRoom, sessionId);
    } else if (req.url.match(/\/api\/message\/([a-z A-Z 0-9 -]+)\/([a-z A-Z 0-9 -]+)/) &&
        req.method === 'GET') {
        //idRoom
        //idMessage

        const idRoom = req.url.split('/')[3];
        const idMessage = req.url.split('/')[4];
        getOneMessage(req, res, idRoom, idMessage);
    } else if (req.url === '/api/generateSession' && req.method === 'POST') {

        generateSessionCookie(req, res);

    } else if (req.url === '/api/messages/createRoomEnhanced' && req.method === 'POST') {
        const body = await getPostData(req);
        var parseMessage = JSON.parse(body);

        createPrivateRoomAndAddToGlobal(req, res, parseMessage.sessionId);
    } else if (req.url.match(/\/api\/user\/id\/([a-z A-Z 0-9 -]+)/) && req.method === 'GET') {
        const idSession = req.url.split('/')[4];
        getUserId(req, res, idSession);
    } else if (req.url.match(/\/api\/listRooms\/([a-z A-Z 0-9 -]+)/) && req.method === 'GET') {
        const idUser = req.url.split('/')[3];

        listRooms(req, res, idUser);
    } else if (req.url.match(/\/api\/aquireRoomInfo\/([a-z A-Z 0-9 -]+)/) && req.method === 'GET') {
        const idRoom = req.url.split('/')[3];

        relayRoomData(req, res, idRoom);
    } else if (req.method === 'OPTIONS') {
        res.writeHead(204,
            corsHeaders);
        res.end();
        return;
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}!!!`));