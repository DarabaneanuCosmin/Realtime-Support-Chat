const db = require("../mysqldb/connection");
const utils = require("../utils/utils");
const util = require("util");
const uuid = require('uuid');

async function getUsernameFromSessionTableById(req, res, idUser) {
    const resultQuery = await db.pool.query("SELECT username from session WHERE idUser = ?", [idUser], function(error, result) {
        if (error) {
            throw error;
        } else {
            console.log(result);
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
    getAdminList
}