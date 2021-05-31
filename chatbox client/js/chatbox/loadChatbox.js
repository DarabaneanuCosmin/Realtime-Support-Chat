var chatIframe;
var chatiframeDocument;


addChat();

function addChat(){
    chatIframe = document.createElement('iframe');

    // 
    chatIframe.setAttribute('src', './index.html');      
    chatIframe.width = 500 + "px";
    chatIframe.height = 500 + "px";
    chatIframe.style.border = 0;

    
    chatIframe.style.position = "fixed";
    chatIframe.style.overflow = "hidden";

    document.body.appendChild(chatIframe); 

    
    chatIframe.style.bottom = 10 + "px";
    chatIframe.style.right = 20 + "px";

    chatiframeDocument = chatIframe.contentDocument;
}