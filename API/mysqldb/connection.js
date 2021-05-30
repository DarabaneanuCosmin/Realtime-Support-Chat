const mysql = require('mysql');
const util = require("util");

var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'web'
});

const globalChatRoomId = -999;


function insertIntoTable(sql, values, tableName) {
    pool.query(sql, values, (err, result) => {

        if (err) { throw err; }
        console.log(`Insert into ${tableName}`);

    });
}

//select * from join WHERE idUser = idUser
//daca exista, returnam mesaj ca ii deja intr-un room
//altfel, se creeaza un nou lobby si il adaugam si in join
//adica insert in Room si join
//atunci cand trimite un mesaj se verifica again in join daca exista respectivul user undeva, luam idRoom si adaugam in campul respectiv
//de verificat daca respectivul user ii admin sau nu




function createUserTable() {
    var sql = "CREATE TABLE IF NOT EXISTS  user (id VARCHAR(255) NOT NULL, username VARCHAR(255), password VARCHAR(255), rol VARCHAR(255), UNIQUE (id))";
    pool.query(sql, (err, result) => {

        if (err) { throw err; return; }
        console.log("Table user created");
    });
}

function createRoomTable() {
    var sql = "CREATE TABLE IF NOT EXISTS  room (idRoom BIGINT(200) NOT NULL, idAssignedAdmin BIGINT(200) , roomName VARCHAR(256),  UNIQUE (idRoom))";
    pool.query(sql, (err, result) => {

        if (err) { throw err; return; }
        console.log("Table room created");
    });
}



function createJoinTable() {
    var sql = "CREATE TABLE IF NOT EXISTS  joinmessages (idRoom VARCHAR(256), idUser VARCHAR(256))";
    pool.query(sql, (err, result) => {

        if (err) { throw err; return; }
        console.log("Table join created");

    });
}

function createSessionTable() {
    var sql = "CREATE TABLE IF NOT EXISTS  session (sessionId VARCHAR(255),idUser VARCHAR(255), create_date VARCHAR(255),UNIQUE(sessionId), username VARCHAR(255))";
    pool.query(sql, (err, result) => {

        if (err) { throw err; return; }
        console.log("Table session created");

    });
}

function createMessagesTable() {
    var sql = "CREATE TABLE IF NOT EXISTS  messages (idMesaj BIGINT(20), idRoom BIGINT(20),idUser VARCHAR(256), clientMessage VARCHAR(2550), sent_message_date TIME)";
    pool.query(sql, (err, result) => {

        if (err) { throw err; return; }
        console.log("Table messages created");

    });
}

function createAdminTable() {
    var sql = "CREATE TABLE IF NOT EXISTS  admin (idAdmin BIGINT(200), username VARCHAR(255), status BOOLEAN, numberOfRooms INT,UNIQUE(idAdmin) )";
    pool.query(sql, (err, result) => {

        if (err) { throw err; return; }
        console.log("Table admin created");

    });
}

function createUserIdSequence() {
    var sql = "CREATE SEQUENCE IF NOT EXISTS  userIdSeq START WITH 1 INCREMENT BY 1 MINVALUE=1 MAXVALUE=1000000;";
    pool.query(sql, (err, result) => {

        if (err) { throw err; return; }
        console.log("Sequence messageId created/kept existing");

    });
}

function createMessageIdSequence() {
    var sql = "CREATE SEQUENCE IF NOT EXISTS  messageIdSeq START WITH 1 INCREMENT BY 1 MINVALUE=1 MAXVALUE=1000000;";
    pool.query(sql, (err, result) => {

        if (err) { throw err; return; }
        console.log("Sequence userID created/kept existing");

    });
}

function insertGlobalMessagesRoom(){
    var sql = "SELECT * FROM room WHERE idroom = " + globalChatRoomId;

    var selectFrom = util.promisify(pool.query).bind(pool);

    selectFrom(sql, [])
    .then(
        (rows) => {
            if(rows.length > 0){
                throw "Global messages room exista deja!";
            } 

            return selectFrom("INSERT INTO room (idRoom, idAssignedAdmin, roomName) VALUES "+
            "(?, ?, ?)", [globalChatRoomId, null, 'Global message room'])
        }
    ).catch((err) =>{
        console.log(err);
    })
}

module.exports = {
    createUserTable,
    createRoomTable,
    createMessagesTable,
    createSessionTable,
    createJoinTable,
    createAdminTable,
    insertIntoTable,
    createUserIdSequence,
    createMessageIdSequence,
    insertGlobalMessagesRoom,
    pool
};