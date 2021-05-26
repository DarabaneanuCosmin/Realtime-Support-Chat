const db = require("../mysqldb/connection");
const utils = require("../utils/utils");
const util = require("util");
const generateUniqueId = require('generate-unique-id');

/*
async function createRoom(req, res, idUser) {
    try {
        //   const value = await db.existsUserInJoinByIdUser(idUser, information);
        /*
          const findSDASDA = await db.pool.query(...{ //result = idUser
              if (error) {
                  throw error;
              } else {
                  idUser
          })
          */
/*
        const resultQuery = await db.pool.query("SELECT idRoom from JOINMESSAGES  WHERE idUser = ?", [idUser], function(error, result) {
            if (error) {
                throw error;
            } else {
                if (result[0] != null) {
                    console.log(result[0]);
                    let message = result[0];
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(message));
                } else {

                    const id = utils.between(100, 12000000000);
                    db.insertIntoTable("INSERT INTO room VALUES (?,?)", [id, null]);
                    db.insertIntoTable("INSERT INTO joinmessages VALUES(?,?)", [id, idUser]);
                    let message = { message: "Room-ul nu exista. Adaugam unul!", idRoom: id };
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(message));
                }
            }
        });

    } catch (error) {
        console.log(error);
    }
}
*/
/*
x2
    if (idUser != undefined) {
                    const resultQuery = await db.pool.query("SELECT idRoom from JOINMESSAGES  WHERE idUser = ?", [value], async function(error, result) {
                        if (error) {
                            throw error;
                        } else {
                            console.log(result[0]);
                            if (result[0] != null) {
                                console.log(result[0]);
                                let message = { message: "Room-ul exista!", idRoom: result[0] };
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify(message));
                            } else {

                                const id = utils.between(100, 12000000000);
                                db.insertIntoTable("INSERT INTO room VALUES (?,?)", [id, null]);
                                db.insertIntoTable("INSERT INTO joinmessages VALUES(?,?)", [id, idUser]);
                                let message = { message: "Room-ul nu exista! Adaugam unul!", idRoom: id };
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify(message));
                            }
                        }
                    });
                } else {
                    let message = { message: "SessionId nu exista!" };
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(message));
                }

*/


async function createRoom(req, res, sessionId) {
    try {
        const getSessionId = await db.pool.query("SELECT idUser from session WHERE sessionId = ?", [sessionId], async function(error, resultQuery) {
            if (error) {
                throw error;
            } else {
                if (resultQuery[0] != undefined) {
                    const idUser = resultQuery[0];
                    await getIdRoomByIdUser(req, res, idUser.idUser);
                } else {
                    let message = { message: `SessionId : ${sessionId} does not exist in db!` };
                    res.writeHead(404, { 'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"});
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
                    let message = { idRoom: result[0].idRoom, message: 'Returning already created room!'};
                    res.writeHead(200, { 'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*" });
                    res.end(JSON.stringify(message));
                } else {
                    const id = utils.between(100, 12000000000);
                    db.insertIntoTable("INSERT INTO room VALUES (?,?)", [id, null]);
                    db.insertIntoTable("INSERT INTO joinmessages VALUES(?,?)", [id, idUser]);
                    let message = { message: "The room does not exist! A new one is added!", idRoom: id };
                    res.writeHead(201, { 'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*" });
                    res.end(JSON.stringify(message));
                }

            }
        });

    } catch (error) {
        console.log(error);
    }
}


async function fetchMessages(req, res, idRoom, idSession) {
    console.log(`Luam mesaje pentru ${idRoom} cu userId ${idSession}`);
    let idUser = -1;
    var selectFrom = util.promisify(db.pool.query).bind(db.pool);
    var messages = [];

    selectFrom("SELECT idUser from session WHERE sessionId = ?", [idSession])
        .then(async (rows) => {
            if (rows.length <= 0) {
                throw "Invalid user id!";
            }

            return await selectFrom("SELECT * FROM joinmessages WHERE idRoom = ?",
                [idRoom]);
        }
        ).then(async (rows) => {

            console.log(rows);
            if (rows.length <= 0) {
                throw "User not present in room";
            }

            idUser = rows[0].idUser;

            return await selectFrom("SELECT* FROM messages WHERE idRoom = ?",
                [rows[0].idRoom])
        }).then((nextRows) => {
            nextRows.forEach((element) => {
                newElement = {...element, 
                    sentByMe: (idUser == element.idUser) ? true : false};
                messages.push(newElement)
            }
            );
            console.log(messages);

            res.writeHead(200, { 'Content-Type': 'application/json',
            "Access-Control-Allow-Origin" : "*" });
            res.end(JSON.stringify(messages));
        })
        .catch((err) => {
            console.log(res);

            res.writeHead(404, { 'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*" });
            res.end(JSON.stringify({ message: err, error: 1 }));
        });
}


async function addUserInRoom(req, res, idRoom, idUser) {
    console.log("idRoom", idRoom);

    if (idUser != undefined) {
        if (idRoom != undefined) {
            let message = idRoom;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(message));
        } else {
            const id = utils.between(100, 12000000000);
            db.insertIntoTable("INSERT INTO room VALUES (?,?)", [id, null]);
            db.insertIntoTable("INSERT INTO joinmessages VALUES(?,?)", [id, idUser]);
            let message = { message: "Room-ul nu exista. Adaugam unul!", idRoom: id };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(message));
        }
    }
}

async function addNewMessages(req, res, idRoom, clientMessage, sessionId) {
    try {
        const getSessionId = await db.pool.query("SELECT idUser from session WHERE sessionId = ?",
            [sessionId], async function (error, resultQuery) {
                if (error) {
                    throw error;
                } else {
                    console.log(resultQuery[0]);
                    if (resultQuery[0] != undefined) {
                        const idUser = resultQuery[0].idUser;

                        const resultQuery1 = await db.pool.query("SELECT idRoom, idUser from JOINMESSAGES  WHERE idUser = ?", [idUser], function (error, result) {
                            if (error) {
                                throw error;
                            } else {

                                if (result.length > 0) {
                                    const now = new Date();
                                    db.insertIntoTable("INSERT INTO messages VALUES (nextval(messageIdSeq), ?,?,?,?)", [idRoom, idUser, clientMessage, now.getTime()], "messages");
                                    const todos = { message: "Mesajul a fost adaugat cu succes!" };
                                    res.writeHead(200, { 'Content-Type': 'application/json',
                                    "Access-Control-Allow-Origin": "*" });
                                    res.end(JSON.stringify(todos));
                                } else {
                                    const todos = { message: "Userul nu exista in lobby-ul indicat" };
                                    res.writeHead(400, { 'Content-Type': 'application/json',
                                    "Access-Control-Allow-Origin": "*" });
                                    res.end(JSON.stringify(todos));
                                }


                            }
                        });

                    } else {
                        let message = { message: "idUser nu exista" };
                        res.writeHead(200, { 'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*" });
                        res.end(JSON.stringify(message));
                    }
                }
            });

    } catch (error) {
        console.log(error);
    }
}
async function getRoomByUserId(req, res, idUser) {
    try {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos));
    } catch (error) {
        console.log(error);
    }
}

async function getAllFromRoom(req, res, idRoom) {
    try {
        const todos = idRoom;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos));
    } catch (error) {
        console.log(error);
    }
}

async function getContentForUser(req, res, idRoom, idClient) {
    try {
        const todos = idRoom;
        console.log(idRoom, idClient);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos));
    } catch (error) {
        console.log(error);
    }
}
async function getNumberOfMessages(req, res, idRoom, idUser, numberOfMessages) {
    try {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos));
    } catch (error) {
        console.log(error);
    }
}
async function deleteRoom(req, res, idRoom) {
    try {
        console.log(idRoom);
        const todos = idRoom;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos));
    } catch (error) {
        console.log(error);
    }
}

async function getAdminList(req, res) {
    try {
        const todos = "YESSSSSSSSS";
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos));
    } catch (error) {
        console.log(error);
    }
}
async function createSession(req, res, session_id, create_date) {

    var selectFrom = util.promisify(db.pool.query).bind(db.pool);

    selectFrom("SELECT idUser from session WHERE sessionId = ?", [session_id])
        .then(async (rows) => {
            if (rows.length > 0) {

                throw "Sesiunea are asignata un user deja";
            }
            db.insertIntoTable("INSERT INTO session (sessionId, idUser, create_date) VALUES (?, nextval(userIdSeq), ?)",
                [session_id, idUser, create_date], "session");
            const mesajReturn = { message: `Sesiune inserata cu success (sesId ${session_id}, createDate ${create_date})`, idUser }
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(mesajReturn));
        }).catch((err) => {
            console.log(err);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: err, error: 1 }));
        });
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
module.exports = {
    createRoom,
    getRoomByUserId,
    getAllFromRoom,
    getContentForUser,
    getNumberOfMessages,
    deleteRoom,
    addNewMessages,
    getAdminList,
    createSession,
    fetchMessages,
    getSession
}