const {
    getOneMessage, addNewMessage, fetchMessages
} = require('../service/MessagesService');

const { getPostData } = require('../utils/utils.js');


async function getFetchMessages(req, res) {
    let idRoom = req.url.split('/')[4];
    let idUser = req.url.split('/')[3];

    fetchMessages(req, res, idRoom, idUser);
}

async function getOneMessageCont(req, res) {

    const idRoom = req.url.split('/')[3];
    const idMessage = req.url.split('/')[4];
    getOneMessage(req, res, idRoom, idMessage);
}

async function postAddNewMessage(req, res) {

    const idRoom = req.url.split('/')[3]; //
    const sessionId = req.url.split('/')[4];

    var body = await getPostData(req);

    var parseMessage = JSON.parse(body);

    //addNewMessages(req, res, idRoom, parseMessage.clientMessage, sessionId);
    addNewMessage(req, res, idRoom, parseMessage.clientMessage, sessionId);
}

module.exports = {
    getFetchMessages,
    getOneMessageCont,
    postAddNewMessage
}