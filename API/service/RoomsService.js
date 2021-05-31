const db = require("../mysqldb/connection");
const util = require("util");
const uuid = require('uuid');
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


                for(row = 0; row < roomRows.length; row++){
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


async function relayRoomData(req, res, idRoom){
    roomData = await getRoomData(idRoom);

    if('error' in roomData && roomData.error === 1){
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


module.exports = {
    createPrivateRoomAndAddToGlobal,
    listRooms,
    relayRoomData
}