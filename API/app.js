const http = require('http');

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

const messageController = require('./controllers/MessageController.js');
const roomController = require('./controllers/RoomController.js');
const userController = require('./controllers/UserController.js');



const Message = require('./utils/messages.js');


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

const server = http.createServer(async (req, res) => {

    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT",
        "Access-Control-Max-Age": 2592000, // 30 days
        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    };


    if (req.url.match(/\/api\/messages\/([a-z A-Z 0-9 -]+)\/([a-z A-Z 0-9 -]+)/) &&
        req.method === 'GET') {

        messageController.getFetchMessages(req, res);
    } else if (req.url === '/api/session' && req.method === 'POST') {
        userController.postCreateSession(req, res);
    } else if (req.url === '/api/updateSession' && req.method === 'PUT') {
        userController.putUpdateSessionUserName(req, res);
    } else if (req.url.match(/\/api\/userData\/([a-z A-Z 0-9 -]+)/) && req.method === 'GET') {
        userController.getUserBasicDataCont(req, res);
    } else if (req.url === '/api/messages/createRoom' && req.method === 'POST') {
        roomController.postCreateRoom(req, res);
    } else if (req.url.match(/\/api\/messages\/([a-z A-Z 0-9 -]+)\/([a-z A-Z 0-9 -]+)/) &&
        req.method === 'POST') {
        //url:/api/messages/:idRoom/:idClient1 si metoda:POST - 
        //adaugam in Room-ul idRoom mesajele noi trimise de catre idClient
        messageController.postAddNewMessage(req, res);

    } else if (req.url == '/api/rooms' &&
        req.method === 'GET') {
        roomController.getAquireAllRooms(req, res);
    } else if (req.url.match(/\/api\/username\/session\/([a-z A-Z 0-9 -]+)/) &&
        req.method === 'GET') {
        userController.getUsernameBySessionId(req, res);
    } else if (req.url.match(/\/api\/admin\/([a-z A-Z 0-9 -]+)\/([a-z A-Z 0-9 -]+)/) && req.method === 'POST') {
        roomController.postAddAdminToRoom(req, res);
    } else if (req.url.match(/\/api\/message\/([a-z A-Z 0-9 -]+)\/([a-z A-Z 0-9 -]+)/) &&
        req.method === 'GET') {
        messageController.getOneMessageCont(req, res);
    } else if (req.url === '/api/generateSession' && req.method === 'POST') {
        userController.postGenerateSessionCookie(req, res);
    } else if (req.url === '/api/messages/createRoomEnhanced' && req.method === 'POST') {
        roomController.postCreatePrivateRoomAndAddToGlobal(req, res);
    } else if (req.url.match(/\/api\/user\/id\/([a-z A-Z 0-9 -]+)/) && req.method === 'GET') {
        userController.getUserIdCont(req, res);
    } else if (req.url.match(/\/api\/listRooms\/([a-z A-Z 0-9 -]+)/) && req.method === 'GET') {
        roomController.getListRooms(req, res);
    } else if (req.url.match(/\/api\/aquireRoomInfo\/([a-z A-Z 0-9 -]+)/) && req.method === 'GET') {
        roomController.getRelayRoomData(req, res);
    } else if (req.method === 'OPTIONS') {
        res.writeHead(204,
            corsHeaders);
        res.end();
        return;
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}!!!`));
