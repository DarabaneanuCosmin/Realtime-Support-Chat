const http = require('http');
const {
    getUsernameFromSessionTableById,

    getRoomByUserId,
    getAllFromRoom,
    getContentForUser,
    getNumberOfMessages,
    deleteRoom,
    getAdminList

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
} = require('./mysqldb/connection');

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
    getAllRooms
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

const server = http.createServer(async(req, res) => {

    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT",
        "Access-Control-Max-Age": 2592000, // 30 days
        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    };


    if (req.url === '/api/admins' && req.method === 'GET') {
        //-url:/api/admins si metoda:GET- luam lista adminilor si verificam statusul lor
        getAdminList(req, res);
    } else if (req.url.match(/\/api\/messages\/([a-z A-Z 0-9 -]+)\/([a-z A-Z 0-9 -]+)/) &&
        req.method === 'GET') {
        let idRoom = req.url.split('/')[4];
        let idUser = req.url.split('/')[3];

        fetchMessages(req, res, idRoom, idUser);
    } else if (req.url === '/api/session' && req.method === 'POST') {
        //adaugam o sesiune noua
        const body = await getPostData(req);
        var parseMessage = JSON.parse(body);
        createSession(req, res, parseMessage.session_id);
    } else if (req.url === '/api/updateSession' && req.method === 'PUT') {
        const body = await getPostData(req);
        var parsedMessage = JSON.parse(body);

        updateSessionUserName(req, res, parsedMessage.session_id,
            parsedMessage.username);
    } else if (req.url.match(/\/api\/userData\/([a-z A-Z 0-9 -]+)/) && req.method === 'GET') {

        let session_id = req.url.split('/')[3];

        getUserBasicData(req, res, session_id);
    } else if (req.url.match(/\/api\/session\/([a-z A-Z 0-9 -]+)/) && req.method === 'GET') {
        //luam sesiunea ce are session_id = ...
        const session_id = req.url.split('/')[3];
        getSession(req, res, session_id);
    } else if (req.url === '/api/messages/createRoom' && req.method === 'POST') {
        //createlobby  cu idLobby = ...
        const body = await getPostData(req);
        var parseMessage = JSON.parse(body);


        createRoom(req, res, parseMessage.sessionId);

    } else if (req.url.match(/\/api\/messages\/showRooms\/([a-z A-Z 0-9 -]+)/) &&
        req.method === 'GET') {
        // /api/messages/showRooms/:idUser si metoda GET - luam room-ul in care este userul idUser

        const idUser = req.url.split('/')[4];
        console.log(idUser);
        getRoomByUserId(req, res, idUser);

    } else if (req.url.match(/\/api\/messages\/([a-z A-Z 0-9]+)\/([a-z A-Z 0-9 -]+)/) &&
        req.method === 'GET') {
        // :/api/messages/:idRoom/:idClient1 si metoda:GET - 
        //luam toate datele conversatiei din Room-ul indicat pentru userul cu id-ul idClient1

        const idRoom = req.url.split('/')[3];
        const idClient = req.url.split('/')[4];
        console.log(idRoom, idClient);
        getContentForUser(req, res, idRoom, idClient);

    } else if (req.url.match(/\/api\/messages\/([a-z A-Z 0-9]+)/) && req.method === 'GET') {
        // /api/messages/:idRoom and method:GET - luam toate datele din db pentru Room-ul indicat

        const idRoom = req.url.split('/')[3];
        console.log(idRoom);
        getAllFromRoom(req, res, idRoom);

    } else if (req.url.match(/\/api\/messages\/([a-z A-Z 0-9]+)/) && req.method === 'DELETE') {
        // url:/api/messages/:idRoom and method:DELETE - stergem conversatia

        const idRoom = req.url.split('/')[3];
        console.log(idRoom);
        deleteRoom(req, res, idRoom);

    } else if (req.url.match(/\/api\/messages\/([a-z A-Z 0-9]+)\/([a-z A-Z 0-9 -]+)/) &&
        req.method === 'POST') {
        //url:/api/messages/:idRoom/:idClient1 si metoda:POST - 
        //adaugam in Room-ul idRoom mesajele noi trimise de catre idClient

        const idRoom = req.url.split('/')[3];
        const sessionId = req.url.split('/')[4];

        var body = await getPostData(req);

        var parseMessage = JSON.parse(body);

        addNewMessages(req, res, idRoom, parseMessage.clientMessage, sessionId);

    } else if (req.url == '/api/rooms' &&
        req.method === 'GET') {
        getAllRooms(req, res);

    } else if (req.url.match(/\/api\/username\/session\/([a-z A-Z 0-9 -]+)/) && req.method === 'GET') {
        const idUser = req.url.split('/')[4];

        getUsernameFromSessionTableById(req, res, idUser)
    } else if (req.url.match(/\/api\/user\/username\/([a-z A-Z 0-9 -]+)/) && req.method === 'GET') {
        const idUser = req.url.split('/')[4];

        getUsernameFromUserTableById(req, res, idUser);
    } else if (req.url === '/api/generateSession' && req.method === 'POST') {

        generateSessionCookie(req, res);
    } else if (req.method === 'OPTIONS') {
        res.writeHead(204,
            corsHeaders);
        res.end();
        return;
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}!!!`));