const uuid = require('uuid');

const db = require("../mysqldb/connection");
const util = require("util");

const {
    stripSpecialCharacters
} = require('../utils/messageValidator.js');



//adauga username-ul unui user nelogat dupa session_id,
//implicit se considera ca si-a dat consentul daca
//unui session id ii este asociat un username
async function updateSessionUserName(req, res, session_id, name) {

    sessionPresent = await sessionExists(session_id);

    //anti xss

    name = stripSpecialCharacters(name);

    if (sessionPresent) {
        db.insertIntoTable("UPDATE SESSION SET username = ? WHERE sessionId = ?", [name, session_id], "session");
        const mesajReturn = { message: `Sesiune updatata cu success (sesId ${session_id}, username ${name})`, username: name }
        res.writeHead(201, {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        });
        res.end(JSON.stringify(mesajReturn));
    } else {
        res.writeHead(400, {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        });
        res.end(JSON.stringify({ message: "Sesiunea nu exista!", error: 1 }));
    }
}

async function sessionExists(sessionId) {
    var selectFrom = util.promisify(db.pool.query).bind(db.pool);

    userExists = false;

    await selectFrom("SELECT idUser from session WHERE sessionId = ?", [sessionId])
        .then((rows) => {
            if (rows.length <= 0) {
                throw "Sesiunea nu exista in BD";
            }
            console.log(rows.length);
            userExists = true;
        }).catch((e) => {
            userExists = false;
        });

    return userExists;
}

async function userGaveConsent(sessionId) {
    userExists = await sessionExists(sessionId);

    if (userExists == false) {
        return false;
    }

    userConsented = true;

    var selectFrom = util.promisify(db.pool.query).bind(db.pool);

    await selectFrom("SELECT username from session WHERE sessionId = ?")
        .then((row) => {
            if (row.length <= 0) {
                userConsented = false;
            }

            if (row[0].username === '' || row[0].username == undefined ||
                row[0].username == null) {
                userConsented = false;
            }
        });

    return userConsented;
}



async function generateSessionCookie(req, res) {

    let generatedSessionId = uuid.v4();

    db.insertIntoTable("INSERT INTO session (sessionId, idUser, create_date) VALUES (?, nextval(userIdSeq), SYSDATE())", [generatedSessionId], "session");

    const mesajReturn = {
        message: `Sesiune inserata cu success (sesId ${generatedSessionId})`,
        session_id: generatedSessionId
    }

    res.writeHead(201, {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    });
    res.end(JSON.stringify(mesajReturn));
}

async function getUserBasicData(req, res, session_id) {

    userPresent = await sessionExists(session_id);
    if (!userPresent) {
        const errorMessage = { message: "User id wrong!" };
        res.writeHead(400, {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        });
        res.end(JSON.stringify(errorMessage));
    }
    hasConsented = false;
    username = '';

    var selectFrom = util.promisify(db.pool.query).bind(db.pool);

    await selectFrom("SELECT idUser, username from session WHERE sessionId = ?", [session_id])
        .then((rows) => {

            username = rows[0].username;

            if (username != '' && username != null && username != undefined) {
                hasConsented = true;
            }

            const userData = {
                message: "User data aquired!",
                idUser: rows[0].idUser,
                username,
                hasConsented
            };
            res.writeHead(200, {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            });
            res.end(JSON.stringify(userData));

        })

}

async function createSession(req, res, session_id, userId) {

    var selectFrom = util.promisify(db.pool.query).bind(db.pool);

    selectFrom("SELECT idUser from session WHERE sessionId = ?", [session_id])
        .then(async (rows) => {
            if (rows.length > 0) {

                throw "Sesiunea are asignata un user deja";
            }

            db.insertIntoTable("INSERT INTO session (sessionId, idUser, create_date) VALUES (?, ?, SYSDATE())", [session_id, userId], "session");
            const mesajReturn = { message: `Sesiune inserata cu success (sesId ${session_id})` }
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(mesajReturn));
        }).catch((err) => {
            console.log(err);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: err, error: 1 }));
        });
}



async function getUserId(req, res, sessionId) {

    const getSessionId = await db.pool.query("SELECT idUser from session WHERE sessionId = ?", [sessionId], async function (error, resultQuery) {
        if (error) {
            throw error;
        } else {
            if (resultQuery[0] != undefined) {
                const idUser = resultQuery[0].idUser;
                var message = { "error": false, "idUser": idUser };
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                });
                res.end(JSON.stringify(message));
            }
        }
    });
}


async function getUsernameFromSessionTableById(req, res, idUser) {
    const resultQuery = await db.pool.query("SELECT username from session WHERE idUser = ?", [idUser], async function (error, result) {
        if (error) {
            throw error;
        } else {

            if (result[0] != undefined && result[0].username != undefined) {

                var message = { "username": result[0].username };
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                });
                res.end(JSON.stringify(message));
            } else {
                let message = { message: 'User does not have an account!' };

                res.writeHead(201, {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                });
                res.end(JSON.stringify(message));
            }
        }
    });
}

module.exports = {
    getUsernameFromSessionTableById,
    getUserId,
    createSession,
    getUserBasicData,
    generateSessionCookie,
    userGaveConsent,
    sessionExists,
    updateSessionUserName
}