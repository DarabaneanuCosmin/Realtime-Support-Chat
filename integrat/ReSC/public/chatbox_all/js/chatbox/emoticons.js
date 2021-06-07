


export function renderEmoticonsByCode(text){
    let emojiMap = new Map();

    emojiMap.set('$happy', '&#x1F600');
    emojiMap.set('$love', '&#x1F970');
    emojiMap.set('$flower', '&#x1F33C');
    emojiMap.set('$bread', '&#x1F35E');
    emojiMap.set('$earth', '&#x1F30D');
    emojiMap.set('$automobile', '&#x1F697');

    return text.split(" ").map(function(word){
        if(word[0] == "$" && emojiMap.has(word)){
            console.log("Found emoticon!");
            return emojiMap.get(word);
        }
        return word;
       }).join(" ");
}