const db = require("../mysqldb/connection");
const utils = require("../utils/utils");
const util = require("util");
const uuid = require('uuid');
const generateUniqueId = require('generate-unique-id');


async function createRoom(req, res, sessionId) {
    try {
        console.log(sessionId);

        const getSessionId = await db.pool.query("SELECT idUser from session WHERE sessionId = ?", [sessionId], async function(error, resultQuery) {
            if (error) {
                throw error;
            } else {
                console.log(resultQuery[0]);
                if (resultQuery[0] != undefined) {
                    const idUser = resultQuery[0];
                    await getIdRoomByIdUser(req, res, idUser.idUser);
                } else {
                    let message = { message: `SessionId : ${sessionId} does not exist in db!` };
                    res.writeHead(404, {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(message));
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}

async function getIdRoomByIdUser(req, res, idUser) {
    try {

        const resultQuery = await db.pool.query("SELECT idRoom from JOINMESSAGES  WHERE idUser = ?", [idUser], function(error, result) {
            if (error) {
                throw error;
            } else {

                if (result[0] != undefined) {
                    let message = { idRoom: result[0].idRoom, message: 'Returning already created room!' };
                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(message));
                } else {
                    const id = utils.between(100, 12000000000);
                    db.insertIntoTable("INSERT INTO room (idRoom,idAssignedAdmin) VALUES (?,?)", [id, null]);
                    db.insertIntoTable("INSERT INTO joinmessages (idRoom, idUser) VALUES(?,?)", [id, idUser]);
                    let message = { message: "The room does not exist! A new one is added!", idRoom: id };
                    res.writeHead(201, {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(message));
                }

            }
        });

    } catch (error) {
        console.log(error);
    }
}


async function getAllRooms(req, res) {
    try {
        var messages = [];
        var ok;
        const resultQuery = await db.pool.query("SELECT idRoom, idUser from messages", async function(error, result) {
            if (error) {
                throw error;
            } else {

                if (result[0] != undefined) {

                    result.forEach((element) => {
                        messages.push(element);

                    });
                    const msg = [];
                    var ok;
                    for (id in messages) {
                        ok = 0;
                        for (iterator in msg) {
                            if (msg[iterator].idRoom == messages[id].idRoom) {
                                ok = 1;
                                break;
                            }

                        }
                        if (ok == 0) {
                            msg.push({ "error": false, "idRoom": messages[id].idRoom, "idUser": messages[id].idUser });
                        }
                    }

                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(msg));
                } else {
                    let message = { "error": true, message: 'No new rooms!' };

                    res.writeHead(201, {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(message));
                }

            }
        });

    } catch (error) {
        console.log(error);
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
async function fetchMessages(req, res, idRoom, idSession) {
    console.log(`Luam mesaje pentru ${idRoom} cu userId ${idSession}`);
    let idUser = -1;
    var selectFrom = util.promisify(db.pool.query).bind(db.pool);
    var messages = [];

    selectFrom("SELECT idUser from session WHERE sessionId = ?", [idSession])
        .then(async(rows) => {
            if (rows.length <= 0) {
                throw "Invalid user id!";
            }

            idUser = rows[0].idUser;

            return await selectFrom("SELECT * FROM joinmessages WHERE idRoom = ?", [idRoom]);
        }).then(async(rows) => {

            console.log(rows);
            if (rows.length <= 0) {
                throw "User not present in room";
            }


            return await selectFrom("SELECT* FROM ((SELECT* FROM MESSAGES m WHERE idRoom = ? ) m " +
                "JOIN ((SELECT idUser as id, username FROM session) UNION (SELECT idAdmin as id, " +
                "username FROM admin) UNION (SELECT id, username FROM user))u ON m.idUser = u.id)", [rows[0].idRoom])
        }).then((nextRows) => {

            nextRows.forEach((element) => {
                newElement = {...element,
                    sentByMe: (idUser == element.idUser) ? true : false
                };
                messages.push(newElement)
            });
            console.log(messages);

            res.writeHead(200, {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            });
            res.end(JSON.stringify(messages));
        })
        .catch((err) => {
            console.log(res);

            res.writeHead(404, {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            });
            res.end(JSON.stringify({ message: err, error: 1 }));
        });
}




async function addNewMessage(req, res, idRoom, clientMessage, sessionId) {
    console.log(`Luam mesaje pentru ${idRoom} cu userId ${sessionId}`);
    let idUser = -1;
    var selectFrom = util.promisify(db.pool.query).bind(db.pool);
    var messages = [];
    selectFrom("SELECT idUser from session WHERE sessionId = ?", [sessionId])
        .then(async(rows) => {
            if (rows.length <= 0) {
                throw "Invalid user id!";
            }
            idUser = rows[0].idUser;
            console.log("idUser", idUser);
            return await selectFrom("SELECT idRoom, idUser from JOINMESSAGES  WHERE idUser = ?", [idUser]);
        }).then(async(rows) => {

            if (rows.length <= 0) {
                throw "User not present in room";
            }
            for (var iterator = 0; iterator < rows.length; iterator++) {
                if (rows[iterator].idRoom == idRoom) {
                    const now = new Date();
                    console.log(now.toLocaleTimeString());
                    db.insertIntoTable("INSERT INTO messages (idMesaj, idRoom, idUser, clientMessage, sent_message_date)" +
                        " VALUES (nextval(messageIdSeq), ?,?,?,?)", [idRoom, idUser, clientMessage, now.toLocaleTimeString()], "messages");
                    const todos = { message: "Mesajul a fost adaugat cu succes!" };
                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(todos));
                    return;
                }
            }
            throw "User not present in room";
        })
        .catch((err) => {
            console.log(res);

            res.writeHead(404, {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            });
            res.end(JSON.stringify({ message: err, error: 1 }));
        });
}
/*
// @desc add a new message to the database
// @route POST /api/messages/{:idRoom}/{:sessionId} with body : {"clientMessage" : ":clientMessage"}
async function addNewMessages(req, res, idRoom, clientMessage, sessionId) {
    try {
        const getSessionId = await db.pool.query("SELECT idUser from session WHERE sessionId = ?", [sessionId],
            async function(error, resultQuery) {
                if (error) {
                    throw error;
                } else {
                    console.log(resultQuery[0]);
                    if (resultQuery[0] != undefined) {
                        const idUser = resultQuery[0].idUser;

                        const resultQuery1 = await db.pool.query("SELECT idRoom, idUser from JOINMESSAGES  WHERE idUser = ?", [idUser],
                            function(error, result) {
                                if (error) {
                                    throw error;
                                } else {

                                    if (result.length > 0) {
                                        console.log(result[0].idRoom, result[0].idUser);
                                        for (var iterator = 0; iterator < result.length; iterator++) {
                                            if (result[iterator].idRoom == idRoom && result[iterator].idUser == idUser) {
                                                const now = new Date();
                                                console.log(now.toLocaleTimeString());
                                                db.insertIntoTable("INSERT INTO messages (idMesaj, idRoom, idUser, clientMessage, sent_message_date) VALUES (nextval(messageIdSeq), ?,?,?,?)", [idRoom, idUser, clientMessage, now.toLocaleTimeString()], "messages");
                                                const todos = { message: "Mesajul a fost adaugat cu succes!" };
                                                res.writeHead(200, {
                                                    'Content-Type': 'application/json',
                                                    "Access-Control-Allow-Origin": "*"
                                                });
                                                res.end(JSON.stringify(todos));
                                                break;
                                            }

                                        }

                                    } else {
                                        const todos = { message: "The received roomID/ iUser should match with the informations from  database" };
                                        res.writeHead(404, {
                                            'Content-Type': 'application/json',
                                            "Access-Control-Allow-Origin": "*"
                                        });
                                        res.end(JSON.stringify(todos));
                                    }
                                }
                            });

                    } else {
                        let message = { message: `SessionId : ${sessionId} does not exist in db!` };
                        res.writeHead(404, {
                            'Content-Type': 'application/json',
                            "Access-Control-Allow-Origin": "*"
                        });
                        res.end(JSON.stringify(message));
                    }
                }
            });

    } catch (error) {
        console.log(error);
    }
}
*/
async function addUserInRoom(req, res, idRoom, idUser) {
    console.log("idRoom", idRoom);

    if (idUser != undefined) {
        if (idRoom != undefined) {
            let message = idRoom;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(message));
        } else {
            const id = utils.between(100, 12000000000);
            db.insertIntoTable("INSERT INTO room (idRoom, idAssignedAdmin) VALUES (?,?)", [id, null]);
            db.insertIntoTable("INSERT INTO joinmessages (idRoom, idUser) VALUES(?,?)", [id, idUser]);
            let message = { message: "Room-ul nu exista. Adaugam unul!", idRoom: id };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(message));
        }
    }
}
//async function createSession(req, res, session_id, create_date) {
//
//    var selectFrom = util.promisify(db.pool.query).bind(db.pool);
//
//    selectFrom("SELECT idUser from session WHERE sessionId = ?", [session_id])
//        .then(async(rows) => {
//            if (rows.length > 0) {
//
//                throw "Sesiunea are asignata un user deja";
//            }
//            db.insertIntoTable("INSERT INTO session (sessionId, idUser, create_date) VALUES (?, nextval(userIdSeq), ?)", [session_id, idUser, create_date], "session");
//            const mesajReturn = { message: `Sesiune inserata cu success (sesId ${session_id}, createDate ${create_date})`, idUser }
//            res.writeHead(201, { 'Content-Type': 'application/json' });
//            res.end(JSON.stringify(mesajReturn));
//        }).catch((err) => {
//            console.log(err);
//            res.writeHead(400, { 'Content-Type': 'application/json' });
//            res.end(JSON.stringify({ message: err, error: 1 }));
//        });
//}


//primeste la input session id si creeaza un rand in tabela pentru
//apeluri din php eventual
async function createSession(req, res, session_id, userId) {

    var selectFrom = util.promisify(db.pool.query).bind(db.pool);

    selectFrom("SELECT idUser from session WHERE sessionId = ?", [session_id])
        .then(async(rows) => {
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

//adauga username-ul unui user nelogat dupa session_id,
//implicit se considera ca si-a dat consentul daca
//unui session id ii este asociat un username
async function updateSessionUserName(req, res, session_id, name) {

    sessionPresent = await sessionExists(session_id);

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

async function getSession(req, res, session_id) {
    try {
        const todos = session_id;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos));
    } catch (error) {
        console.log(error);
    }
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
module.exports = {
    createRoom,
    getUserBasicData,
    createSession,
    fetchMessages,
    getSession,
    updateSessionUserName,

    generateSessionCookie,
    getAllRooms,
    addNewMessage
}