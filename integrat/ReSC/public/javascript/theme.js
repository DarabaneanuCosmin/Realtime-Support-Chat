var themeIndex;

function applyTheme(){
    loadTheme();
}

function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [k, v] = el.split('=');
        cookie[k.trim()] = v;
    })
    return cookie[name];
}

function loadThemeFromCookie(){
    let theme = localStorage.getItem('theme');
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    if(theme!=null){
        if(theme == 'light'){
            var oldCss = document.getElementsByTagName('link')[1];
            if(oldCss != null){
                oldCss.parentNode.removeChild(oldCss);
            }
            link.href = '../../css/adminPanelLight.css';
        }else if(theme == 'dark'){
            var oldCss = document.getElementsByTagName('link')[1];
            if(oldCss != null){
                oldCss.parentNode.removeChild(oldCss);
            }
            link.href = '../../css/adminPanelDark.css';
        }
        head.appendChild(link);
    }else{
        var oldCss = document.getElementsByTagName('link')[1];
        if(oldCss != null){
            oldCss.parentNode.removeChild(oldCss);
        }
        link.href = '../../css/adminPanelLight.css';
        localStorage.setItem('theme','light');
        head.appendChild(link);
    }
}

function loadTheme(){
    var selector = document.getElementById("themeSelect");
    themeIndex = selector.value;
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    if(localStorage.getItem('theme')!=null){
        if(themeIndex == 1){
            var oldCss = document.getElementsByTagName('link')[0];
            if(oldCss != null){
                oldCss.parentNode.removeChild(oldCss);
            }
            link.href = '../../css/adminPanelLight.css';
            localStorage.setItem('theme','light');
        }
        if(themeIndex == 2){
            var oldCss = document.getElementsByTagName('link')[0];
            if(oldCss != null){
                oldCss.parentNode.removeChild(oldCss);
            }
            link.href = '../../css/adminPanelDark.css';
            localStorage.setItem('theme','dark');
        }
    }
    head.appendChild(link);
}

window.onload = loadThemeFromCookie;