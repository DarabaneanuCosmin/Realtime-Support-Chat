var themeIndex;

function applyTheme(){
    loadTheme();
}


function loadTheme(){
    var selector = document.getElementById("themeSelect");
    themeIndex = selector.value;
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    if(themeIndex == 1){
        var oldCss = document.getElementsByTagName('link')[1];
        var option = selector.getElementsByTagName('option')[1].removeAttribute("selected");
        if(oldCss != null){
            oldCss.parentNode.removeChild(oldCss);
        }
        var option = selector.getElementsByTagName('option')[0].setAttribute("selected" , "selected");
        link.href = '../../css/adminPanelLight.css';
    }
    if(themeIndex == 2){
        console.log(themeIndex);
        var oldCss = document.getElementsByTagName('link')[1];
        selector.getElementsByTagName('option')[0].removeAttribute("selected");
        console.log(oldCss);
        if(oldCss != null){
            oldCss.parentNode.removeChild(oldCss);
        }
        selector.getElementsByTagName('option')[1].setAttribute("selected" , "selected");
        link.href = '../../css/adminPanelDark.css';
    }
    
    head.appendChild(link);
}

window.onload = loadTheme;