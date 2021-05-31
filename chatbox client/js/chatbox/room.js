export class Room {
    constructor(adminName, idAssignedAdmin, idRoom, lastMessage, roomName, 
        roomParticipantsCount) {
        this.adminName = adminName;
        this.idAssignedAdmin = idAssignedAdmin;
        this.idRoom = idRoom;
        this.lastMessage = lastMessage;
        this.roomName = roomName;
        this.roomParticipantsCount = roomParticipantsCount;
    }
}