const db = require("../mysqldb/connection");
const utils = require("../utils/utils");
const util = require("util");
const uuid = require('uuid');

async function getUserId(req, res, sessionId) {

    const getSessionId = await db.pool.query("SELECT idUser from session WHERE sessionId = ?", [sessionId], async function(error, resultQuery) {
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

async function getOneMessage(req, res, idRoom, idMessage) {
    const resultQuery = await db.pool.query("SELECT idMesaj,clientMessage,idUser from messages WHERE idMesaj > ? AND idRoom = ?", [idMessage, idRoom], async function(error, result) {
        if (error) {
            throw error;
        } else {

            if (result[0] != undefined) {
                var message = { "error": false, "idMesaj": result[0].idMesaj, "clientMessage": result[0].clientMessage, "idUser": result[0].idUser, "idRoom": idRoom };
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                });
                res.end(JSON.stringify(message));
            } else {
                let message = { error: true, message: 'of' };

                res.writeHead(201, {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                });
                res.end(JSON.stringify(message));
            }
        }
    });

}
async function getUsernameFromSessionTableById(req, res, idUser) {
    const resultQuery = await db.pool.query("SELECT username from session WHERE idUser = ?", [idUser], async function(error, result) {
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
async function addAdminToRoom(req, res, idRoom, sessionId) {
    try {
        const getSessionId = await db.pool.query("SELECT idUser from session WHERE sessionId = ?", [sessionId], async function(error, resultQuery) {
            if (error) {
                throw error;
            } else {
                if (resultQuery[0] != undefined) {
                    const idUser = resultQuery[0].idUser;

                    const verifyJoinMessages = await db.pool.query("SELECT idAssignedAdmin from room WHERE idRoom = ?", [idRoom], async function(error, queryResult) {

                        if (queryResult[0].idAssignedAdmin != idUser) {
                            const resultQuery1 = await db.pool.query("update room set idAssignedAdmin = ? WHERE idRoom = ?", [idUser, idRoom], async function(error, result) {
                                if (error) {
                                    throw error;
                                } else {
                                    const ress = await db.pool.query("INSERT INTO JOINMESSAGES (idRoom, idUser) VALUES(?,?)", [idRoom, idUser], function(error, resultInsert) {
                                        if (error) {
                                            throw error;
                                        } else {

                                            var message = { "message": 'Succesfully!' };
                                            res.writeHead(200, {
                                                'Content-Type': 'application/json',
                                                "Access-Control-Allow-Origin": "*"
                                            });
                                            res.end(JSON.stringify(message));
                                        }
                                    });

                                }
                            });
                        } else {
                            let message = { message: `Adminul a fost adaugat deja in acest room!` };
                            res.writeHead(200, {
                                'Content-Type': 'application/json',
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.end(JSON.stringify(message));

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


module.exports = {
    getUsernameFromSessionTableById,
    getRoomByUserId,
    getAllFromRoom,
    getContentForUser,
    getNumberOfMessages,
    deleteRoom,
    getAdminList,
    addAdminToRoom,
    getOneMessage,
    getUserId
}