

export class Message{
    constructor(idMessage, messageText, sentByMe, dateSent, senderName){
        this.idMessage = idMessage;
        this.senderName = senderName;
        this.messageText = messageText;
        this.sentByMe = sentByMe;
        this.dateSent = dateSent;
    }
}