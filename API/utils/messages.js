var Message = function(idRoom, idUser, clientMessage, sentMessageDate) {
    this.idRoom = idRoom;
    this.idUser = idUser;
    this.clientMessage = clientMessage;
    this.sentMessageDate = sentMessageDate;

    this.toJson = function() {
        return ("{" +
            "\"idRoom\":\"" + this.idRoom + "\"," +
            "\"idUser\":\"" + this.idUser + "\"," +
            "\"clientMessage\":\"" + this.clientMessage + "\"," +
            "\"sentMessageDate\":" + this.sentMessageDate + "," + "}");
    };
};


module.exports = Message