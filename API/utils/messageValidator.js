
function validateMessage(message){
    
    if(!message.trim().length){
        return false;
    }
    return true;
}

function sanitizeHTML(text) {
    var element = document.createElement('div');
    element.innerText = text;
    return element.innerHTML;
}

function stripSpecialCharacters(text){
    return text.replace(/\W+/g, " ");
}

module.exports = {
    validateMessage,
    sanitizeHTML,
    stripSpecialCharacters
}