const { getPostData } = require('../utils/utils.js');

const {
    getUsernameFromSessionTableById,
    getUserId,
    createSession,
    getUserBasicData,
    generateSessionCookie,
    updateSessionUserName
} = require('../service/UserService.js');

async function getUsernameBySessionId(req, res) {
    const idUser = req.url.split('/')[4];

    getUsernameFromSessionTableById(req, res, idUser)

}
async function getUserIdCont(req, res) {
    const idSession = req.url.split('/')[4];
    getUserId(req, res, idSession);
}

async function postCreateSession(req, res) {
    //adaugam o sesiune noua
    const body = await getPostData(req);
    var parseMessage = JSON.parse(body);
    createSession(req, res, parseMessage.session_id, parseMessage.idUser);

}



async function getUserBasicDataCont(req, res) {

    let session_id = req.url.split('/')[3];

    getUserBasicData(req, res, session_id);

}


async function postGenerateSessionCookie(req, res) {
    generateSessionCookie(req, res);
}


async function putUpdateSessionUserName(req, res) {
    const body = await getPostData(req);
    var parsedMessage = JSON.parse(body);

    updateSessionUserName(req, res, parsedMessage.session_id,
        parsedMessage.username);
}

module.exports = {
    getUsernameBySessionId, getUserIdCont, postCreateSession,
    getUserBasicDataCont, postGenerateSessionCookie, putUpdateSessionUserName
}



