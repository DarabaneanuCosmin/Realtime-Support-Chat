function changeContentActivitati() {

    var div = document.createElement("div");
    document.getElementById("targetElement").innerHTML = "";
    div.setAttribute("class", "someClass");
    div.innerHTML = document.getElementById("activitatiContent").innerHTML;
    document.getElementById("targetElement").appendChild(div);

}

function changeContentHoteluri() {

    var div = document.createElement("div");
    document.getElementById("targetElement").innerHTML = "";
    div.setAttribute("class", "someClass");
    div.innerHTML = document.getElementById("hoteluriContent").innerHTML;
    document.getElementById("targetElement").appendChild(div);
}

function changeContentTransport() {
    var div = document.createElement("div");
    document.getElementById("targetElement").innerHTML = "";
    div.setAttribute("class", "someClass");
    div.innerHTML = document.getElementById("transportContent").innerHTML;
    document.getElementById("targetElement").appendChild(div);
}