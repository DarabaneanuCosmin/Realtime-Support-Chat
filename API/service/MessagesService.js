
const db = require("../mysqldb/connection");
const util = require("util");


const sanitizeHtml = require('sanitize-html');

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

            idUser = rows[0].idUser;

            return await selectFrom("SELECT * FROM joinmessages WHERE idRoom = ?", [idRoom]);
        }).then(async (rows) => {

            console.log(rows);
            if (rows.length <= 0) {
                throw "User not present in room";
            }


            return await selectFrom("SELECT* FROM ((SELECT* FROM MESSAGES m WHERE idRoom = ? ) m " +
                "JOIN ((SELECT idUser as id, username FROM session) UNION (SELECT idAdmin as id, " +
                "username FROM admin) UNION (SELECT id, username FROM user))u ON m.idUser = u.id)", [rows[0].idRoom])
        }).then(async (nextRows) => {

            nextRows.forEach((element) => {
                newElement = {
                    ...element,
                    sentByMe: (idUser == element.idUser) ? true : false
                };
                messages.push(newElement)
            });

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

    let idUser = -1;
    var selectFrom = util.promisify(db.pool.query).bind(db.pool);
    var messages = [];

    clientMessage = sanitizeHtml(clientMessage, {
        disallowedTagsMode: 'recursiveEscape',
        allowedTags: [],
        allowedAttributes: {}
    });

    selectFrom("SELECT idUser from session WHERE sessionId = ?", [sessionId])
        .then(async (rows) => {
            if (rows.length <= 0) {
                throw "Invalid user id!";
            }
            idUser = rows[0].idUser;
            return await selectFrom("SELECT idRoom, idUser from JOINMESSAGES  WHERE idUser = ?", [idUser]);
        }).then(async (rows) => {

            if (rows.length <= 0) {
                throw "User not present in room";
            }
            for (var iterator = 0; iterator < rows.length; iterator++) {
                if (rows[iterator].idRoom == idRoom) {
                    const now = new Date();
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


async function getOneMessage(req, res, idRoom, idMessage) {
    const resultQuery = await db.pool.query("SELECT idMesaj,clientMessage,idUser from messages WHERE idMesaj > ? AND idRoom = ?", [idMessage, idRoom], async function (error, result) {
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


module.exports = {
    getOneMessage, addNewMessage, fetchMessages
}