

export class Message{
    constructor(idMessage, messageText, sentByMe, dateSent, senderName){
        this.idMessage = idMessage;
        this.senderName = senderName;
        this.messageText = messageText;
        this.sentByMe = sentByMe;
        this.dateSent = dateSent;
    }
}

export function ApplyEmoticonFilter(text){
    const emoticonMap = {
        '$floare': '&#x2740;',
        '$like': '	&#128077',
        '$smile': '&#128522',
        '$heart': '&#128525',
        '$clap': '&#128079',
        '$salute': '&#128075'
    }

    var tokens = text.split(" ");

    for(tok = 0; tok < tokens.length; tok++){
        if(emoticonMap.has(tokens[tok])){
            tokens[tok] = emoticonMap[tokens[tok]];
        }
    }

    return tokens.join(" ");
}
