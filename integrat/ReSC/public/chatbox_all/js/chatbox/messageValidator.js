

export function validateMessage(message){
    
    if(!message.trim().length){
        return false;
    }
    return true;
}