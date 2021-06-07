const utils = require("../utils/utils");


const db = require("../mysqldb/connection");
const util = require("util");
const { randomIntFromInterval } = require("../utils/mymaths");


const globalChatRoomIdDefault = -999;

async function createPrivateRoomAndAddToGlobal(req, res, sessionId) {
    var querryExecutor = util.promisify(db.pool.query).bind(db.pool);

    let idUser = -1;

    querryExecutor("SELECT idUser FROM session WHERE sessionId = ?", [sessionId])
        .then(
            async (rows) => {
                if (rows.length <= 0) {
                    throw { message: "Session doesn't exist!", idRoom: null };
                }

                idUser = rows[0].idUser;

                return await querryExecutor("SELECT idUser, idRoom FROM JOINMESSAGES WHERE idUser = ? AND idRoom != " + globalChatRoomIdDefault
                    , [rows[0].idUser]);
            }
        ).then(
            async (rows) => {
                if (rows.length >= 1) {
                    let roomInfo = await getRoomData(rows[0].idRoom);

                    throw { message: "Room already exists!", ...roomInfo };
                }

                const generatedId = randomIntFromInterval(1, (1 << 52) - 1);

                //creeaza room-ul nou
                let task1 = querryExecutor("INSERT INTO ROOM (idRoom, idAssignedAdmin, roomName)" +
                    " VALUES(?, ?, ?)", [generatedId, null, '']);
                let task2 = querryExecutor("INSERT INTO joinmessages (idRoom, idUser)" +
                    " VALUES (?, ?)", [generatedId, idUser]);

                //adauga-l in room-ul global
                let task3 = querryExecutor("INSERT INTO joinmessages (idRoom, idUser)" +
                    " VALUES (?, ?)", [globalChatRoomIdDefault, idUser]);

                await task1;
                await task2;
                await task3;

                return generatedId;
            }
        ).then(async (generatedId) => {
            res.writeHead(201, {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            });

            let roomInfoSuccess = await getRoomData(generatedId);

            res.end(JSON.stringify({ message: "Room inserted successfully!", ...roomInfoSuccess }));
        }).catch((err) => {

            if ('idRoom' in err) {
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                });
            } else {
                res.writeHead(400, {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                });
            }

            res.end(JSON.stringify(err));
        });
}

async function listRooms(req, res, sessionId) {
    var querryExecutor = util.promisify(db.pool.query).bind(db.pool);

    let idUser = -1;

    querryExecutor("SELECT idUser FROM session WHERE sessionId = ?", [sessionId])
        .then(
            async (rows) => {
                if (rows.length <= 0) {
                    throw { message: "Session doesn't exist!", idUser: null };
                }

                idUser = rows[0].idUser;

                return await querryExecutor("SELECT idRoom FROM JOINMESSAGES WHERE idUser = ?"
                    , [rows[0].idUser]);
            }).then(async (roomRows) => {
                var rooms = [];


                for (row = 0; row < roomRows.length; row++) {
                    let roomInfo = await getRoomData(roomRows[row].idRoom);

                    rooms.push(roomInfo);
                }

                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                });


                res.end(JSON.stringify(rooms));

            }).catch((err) => {


                res.writeHead(400, {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                });

                res.end(JSON.stringify(err));
            });
}


async function getRoomData(idRoom) {
    var querryExecutor = util.promisify(db.pool.query).bind(db.pool);

    let roomDataResult = await querryExecutor("SELECT* FROM ROOM WHERE idRoom = ?", [idRoom])
        .then(async (rows) => {
            if (rows.length <= 0) {
                throw "No room data available";
            }

            //ia ultimul mesaj
            let lastMessage = await querryExecutor("SELECT clientMessage FROM MESSAGES"
                + " WHERE idRoom = ? ORDER BY idMesaj desc", [idRoom])
                .then((rows) => {
                    if (rows.length <= 0) {
                        return "";
                    }

                    return rows[0].clientMessage;
                })

            let adminName;
            let idAssignedAdmin = rows[0].idAssignedAdmin;

            if (idAssignedAdmin != null) {
                adminName = await querryExecutor("SELECT username FROM admin"
                    + " WHERE idAdmin = ?", [idAssignedAdmin])
                    .then((rows) => {
                        if (rows.length <= 0) {
                            return "";
                        }

                        return rows[0].username;
                    })
            } else {
                adminName = "";
            }

            let participantsCount = 0;

            participantsCount = await querryExecutor("SELECT COUNT(*) as nrParticipanti FROM JOINMESSAGES"
                + " WHERE idRoom = ?", [idRoom])
                .then((rows) => {
                    if (rows.length <= 0) {
                        return 0;
                    }

                    return rows[0].nrParticipanti;
                })

            return { ...rows[0], lastMessage, adminName, participantsCount };
        })
        .catch((err) => {
            return { error: true, errorMessage: err }
        });



    return roomDataResult;
}


async function relayRoomData(req, res, idRoom) {
    roomData = await getRoomData(idRoom);

    if ('error' in roomData && roomData.error === 1) {
        res.writeHead(400, {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        });

        res.end(JSON.stringify(roomData));
    } else {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        });


        res.end(JSON.stringify(roomData));
    }
}

async function createRoom(req, res, sessionId) {
    try {
        const getSessionId = await db.pool.query("SELECT idUser from session WHERE sessionId = ?", [sessionId], async function (error, resultQuery) {
            if (error) {
                throw error;
            } else {

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

        const resultQuery = await db.pool.query("SELECT idRoom from JOINMESSAGES  WHERE idUser = ?", [idUser], function (error, result) {
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
        const resultQuery = await db.pool.query("SELECT idRoom, idUser from messages", async function (error, result) {
            if (error) {
                throw error;
            } else {

                if (result[0] != undefined) {

                    result.forEach((element) => {
                        messages.push(element);

                    });
                    var msg = [];
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


async function addAdminToRoom(req, res, idRoom, sessionId) {
    try {
        const getSessionId = await db.pool.query("SELECT idUser from session WHERE sessionId = ?", [sessionId], async function (error, resultQuery) {
            if (error) {
                throw error;
            } else {
                if (resultQuery[0] != undefined) {
                    const idUser = resultQuery[0].idUser;

                    const verifyJoinMessages = await db.pool.query("SELECT idAssignedAdmin from room WHERE idRoom = ?", [idRoom], async function (error, queryResult) {

                        if (queryResult[0].idAssignedAdmin != idUser) {
                            const resultQuery1 = await db.pool.query("update room set idAssignedAdmin = ? WHERE idRoom = ?", [idUser, idRoom], async function (error, result) {
                                if (error) {
                                    throw error;
                                } else {
                                    const ress = await db.pool.query("INSERT INTO JOINMESSAGES (idRoom, idUser) VALUES(?,?)", [idRoom, idUser], function (error, resultInsert) {
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

module.exports = {
    createPrivateRoomAndAddToGlobal,
    listRooms,
    getRoomData,
    relayRoomData,
    createRoom,
    getIdRoomByIdUser,
    getAllRooms,
    onlyUnique,
    addUserInRoom,
    addAdminToRoom
}