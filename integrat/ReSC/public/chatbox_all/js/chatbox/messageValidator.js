

export function validateMessage(message){
    
    if(!message.trim().length){
        return false;
    }
    return true;
}

export function sanitizeHTML(text) {
    var element = document.createElement('div');
    element.innerText = text;
    return element.innerHTML;
}

//Nu scoate si underScore
export function stripSpecialCharacters(text){
    return text.replace(/\W+/g, '');
}